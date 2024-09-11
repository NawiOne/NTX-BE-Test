const redis = require('../config/redis')

exports.insertRedis = async (field, data) => {
    const insert = await (await redis).set(field, JSON.stringify(data));

    return insert
}

exports.deleteRedis = async (field) => {
    const del = await (await redis).del(field);

    return del
}

exports.getFromRedis = async (field) => {
    const data = await (await redis).get(field);

    return JSON.parse(data, null, 2)

}