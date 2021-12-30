/*
	This middleware will check the validity of JWT token,
	it will not allow to access the route if the token is invalid.
*/
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
	const accessToken = req.headers.authorization ? 
						req.headers.authorization.split("Bearer ").join("").trim() : null

	//if there is no token stored in cookies, the request is unauthorized
	if (!accessToken){
		return res.status(403).json({error: "Authentication required!"})
	}

	let payload
	try{
		//use the jwt.verify method to verify the access token
		//throws an error if the token has expired or has a invalid signature
		payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

		// Capture the user id for future use //
		res.locals = Object.assign({}, res.locals, {_id: payload._id})

		next()
	}
	catch(e){
		//if an error occured return request unauthorized error
		return res.status(401).json({error: "Invalid Token!"})
	}
}