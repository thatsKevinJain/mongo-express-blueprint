/*
	Get all the available User Defined Models
*/

var normalizedPath = require("path").join(__dirname, "/")

const models = {}

require("fs")
.readdirSync(normalizedPath)
.forEach(function(file) {

	// Remove the .js extension from filename //
	const model = file.split(".js").join("").trim().toString().toLowerCase()

	// Require the file and append to models //
	models[model] = require("./" + file)
})

module.exports = models