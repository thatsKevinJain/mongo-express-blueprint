var routes = require('../config/routes')
var authenticate = require('./authenticate') 

// This will allow execution of async/await in middleware functions //
const asyncHandler = fn => (req, res, next) =>
	Promise
	.resolve(fn(req, res, next))
	.catch((err) =>{
		console.log(err)
		return res.status(400).json(err)
	})

module.exports = function(app){

	// Fetch Model names //
	for(var model in routes){

		// Fetch Controller Actions for each model //
		for(var action in routes[model]){

			var route = `/${model.toLowerCase()}/${action}`
			var actionCall = require('../api/controller/'+model+"Controller")[action]
			var allowedMethods = routes[model][action].method
			var auth = routes[model][action].auth

			// Add dynamic routes //
			allowedMethods.forEach(allowedMethod => {

				// Add authenication middleware to protected routes //
				if(auth)
					app[allowedMethod](route, authenticate, asyncHandler(actionCall))
				else
					app[allowedMethod](route, asyncHandler(actionCall))
			})
		}
	}
}