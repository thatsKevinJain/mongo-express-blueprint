// Define each model here //
// Follow AJV guidelines for adding a schema //
module.exports = {
	type: 'object',
	properties:{
		foo:{
			type: "string"
		}
	},
	additionalProperties: false
}