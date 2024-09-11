const db = require("../models");
const SuccessResult = require('../utils/SuccessResult');
const DataNotFound = require("../utils/dataNotFound");
const { getFromRedis, insertRedis } = require('../utils/redis')
const { setToken } = require("../utils/jwtTokens");


exports.refactoreMe1 = async (_, res) => {
  const lengthSurveyIndex = 10;

  const queryIndexFields = mappingQueryIndex(lengthSurveyIndex)

  const query = await db.sequelize.query(`SELECT ${queryIndexFields} FROM surveys`);

  const data = query[0][0]

  SuccessResult.make(res).send(mappingTotalIndex(data))
};


exports.refactoreMe2 = async (req, res) => {
  const userId = req.body.userId;
  const values = req.body.values;
  const currentUser = await getUserById(userId);

  if (currentUser.length === 0) throw new DataNotFound('User not found');

  await insertAndUpdateSuryeys(userId, values)

  SuccessResult.make(res).send({ userId, values }, 'Survey sent successfully!')

};


exports.getData = async (req, res) => {
  const type = req.query.type;
  const field = type === 'source' ? 'sourceCountry' : 'destinationCountry';
  const dataRedis = await getFromRedis(field);

  let data = [];

  if (dataRedis) {
    data = dataRedis

  } else {

    const selectQuery = `
        SELECT 
            "${field}"  AS label,
            COUNT(*) AS total 
        FROM attack_logs 
        GROUP BY "${field}"
        ORDER BY total
  `
    const result = await db.sequelize.query(selectQuery);

    data = result[0];

    await insertRedis(field, data)
  }

  const label = data.map(item => item.label);
  const total = data.map(item => item.total);

  SuccessResult.make(res).send({ label, total })

};


const getUserById = async (userId) => {
  const selectQuery = `SELECT id FROM users WHERE id = :userId`;

  const data = await db.sequelize.query(selectQuery, {
    replacements: { userId }
  })

  return data[0]
}

const insertAndUpdateSuryeys = async (userId, values) => {
  await db.sequelize.transaction(async trx => {
    const updateQuery = `
          UPDATE 
              users 
          SET dosurvey  = TRUE 
          WHERE id = :userId`;

    const insertQuery = `
          INSERT 
                INTO surveys (values, "userId", "createdAt", "updatedAt")
          VALUES
                (
                  ARRAY[:values], 
                  :userId,
                  current_timestamp, 
                  current_timestamp
                )`;


    await db.sequelize.query(insertQuery, {
      replacements: { values, userId },
      transaction: trx,
    })

    await db.sequelize.query(updateQuery, {
      replacements: { userId },
      transaction: trx
    })
  })

}


const mappingTotalIndex = (data) => {
  const totalIndex = []
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      const value = Number(data[key])
      totalIndex.push(value)

    }
  }

  return totalIndex
}

const mappingQueryIndex = (lengthSurveiIndex) => {
  let fields = '';
  for (let index = 1; index <= lengthSurveiIndex; index++) {
    const endOfString = index === lengthSurveiIndex ? index : index + ',';

    fields += string = `SUM(COALESCE ((VALUES [${index}]), 0))/ 10 AS index${endOfString}`;
  }

  return fields
}

exports.loginSimulation = async (req, res) => {
  const role = req.body.role;

  const token = setToken({ role })

  SuccessResult.make(res).send(token)

}