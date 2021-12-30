const models = require('../models/index')
const ajv = require('./ajv')

module.exports = function(modelName, obj={}){

	return new Promise((resolve, reject) => {

		// Make the modelName lowerCase to match conventions //
		modelName = modelName.toLowerCase()

		// Check if model definition has a schema //
		if(!models[modelName].hasOwnProperty('schema'))
		{
			return reject({ error: "Valid Schema not found!" })
		}

		if(Array.isArray(obj)){
			obj = obj.map((ele) => {

				// Don't Allow empty objects //
				if(Object.entries(ele).length === 0 && ele.constructor === Object)
				{
					return reject({ ele, error: 'Empty Object cannot be passed!' })
				}

				const isValid = ajv.validate(models[modelName].schema, ele)

				return (isValid ? ele : reject({ ele, error: ajv.errors[0] }))
			})
			return resolve(obj)
		}
		
		// Don't Allow empty objects //
		if(Object.entries(obj).length === 0 && obj.constructor === Object)
		{
			return reject({ obj, error: 'Empty Object cannot be passed!' })
		}

		const isValid = ajv.validate(models[modelName].schema, obj)

		return (isValid ? resolve() : reject({ obj, error: ajv.errors[0] }))
	})
}