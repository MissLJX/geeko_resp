const axios = require('./apiconfigs')

exports.getThemes = function () {
    return axios.get('/v7/collection/anon/theme', {}, {})
}

