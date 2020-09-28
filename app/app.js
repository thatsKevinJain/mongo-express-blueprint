// Connect to DB //
const mongo = require('./driver/mongoDriver')

// Create a server //
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// CORS //
const cors = require('./middleware/cors')
app.use(cors)

// This middleware will attach a mongodb instance to req object //
app.use(require('./middleware/mongoMiddleware'))

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Add all routes //
require('./middleware/dynamicRoutes')(app)

mongo.getDb()
.then((db) => {
	app.listen(port, () => console.log(`App listening on port ${port}!`))
})
.catch((err) => {
	console.log(`Error connecting to MongoDb`)
})