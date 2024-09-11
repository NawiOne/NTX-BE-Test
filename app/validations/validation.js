const Joi = require('joi');
const InvalidData = require('../utils/invalidData');


const getDataAttackLogs = (req, _, next) => {
    const schema = Joi.object({
        type: Joi
            .string()
            .valid('source', 'destination')
            .required()

    });
    const { error } = schema.validate(req.query);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}

const insertSurvey = (req, _, next) => {
    const schema = Joi.object({
        userId: Joi
            .number()
            .required(),
        values: Joi
            .array()
            .items(Joi.number())
            .required()

    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}



module.exports = {
    getDataAttackLogs,
    insertSurvey
}