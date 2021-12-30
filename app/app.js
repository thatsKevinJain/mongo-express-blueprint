// Configure DotEnv //
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./driver/mongoDriver')
const cors = require('./middleware/cors')
const createIndex = require('./driver/createIndex')

// Create a server //
const app = express()
const port = process.env.PORT || 3000

// CORS //
app.use(cors)

// Request/Response handlers //
app.use(express.json())
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Add all routes //
require('./middleware/dynamicRoutes')(app)

mongo
.then(db => {
	return createIndex(db)
})
.then(() => {
	app.listen(port, () => console.log(`App listening on port ${port}!`))
})
.catch(err => {
	console.log(`Error connecting to MongoDb`)
	console.log(err)
})