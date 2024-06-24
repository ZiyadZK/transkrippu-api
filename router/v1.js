const express = require('express')

const route_v1 = express.Router()

.get('/', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API is Connected!'
    })
})

.get('/v1', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API v1 is Connected!'
    })
})

.get('/v1/data', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API of Data v1 is Connected!'
    })
})

module.exports = route_v1