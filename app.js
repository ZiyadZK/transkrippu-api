const express = require('express')
const path = require('path')

const dotenv = require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { validateApiKey } = require('./middleware')
const route_v1 = require('./router/v1')

const app = express()

app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        return bodyParser.json()(req, res, next)
    }

    next()
})

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8080

app.use('/sitrans', validateApiKey, route_v1)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Unknown Method!'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})