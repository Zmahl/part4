//Set up express server, and set all necessary libraries  to be required
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blog_routes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


//Handles connection to the database
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })



//Lastly, impletment app.use() for every single library/dependency called including all middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

//set default url
app.use('/api/blog', blogRouter)

//These 2 must be last
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//export app with all dependencies/libraries
module.exports = app