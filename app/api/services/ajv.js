const { ObjectId } = require('mongodb')

// AJV Dependencies //
var Ajv = require('ajv')
const addFormats = require("ajv-formats")
const ajv = new Ajv({ allErrors: true, strict: false, useDefaults: true})
require("ajv-keywords")(ajv)

// Add a custom keyword to convert references into valid mongodb ObjectIds //
ajv.addKeyword('convertToObjectId', {
		modifying: true,
		schema: false, // keyword value is not used, can be true
		validate: function(data, dataPath){
			if(ObjectId.isValid(data)){
				if (typeof data == 'string' && ObjectId.isValid(data))
					dataPath.parentData[dataPath.parentDataProperty] = ObjectId(data);
				return true
			}
			return false
		}
})

addFormats(ajv)

module.exports = ajv