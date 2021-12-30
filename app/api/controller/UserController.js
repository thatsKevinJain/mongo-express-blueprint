// Collection Name //
const USER = 'user'

const mongo = require("../../driver/mongoDriver")

module.exports = {

	find: async function(req, res){
		
		const db = await mongo
		
		// We will get this from the previous authentication middleware //
		const _id = res.locals._id

		const response = await db.collection(USER).findOne({_id: db.ObjectId(_id)})
		res.json(response)
	},

	delete: async function(req, res){
		const db = await mongo
		
		// We will get this from the previous authentication middleware //
		const _id = res.locals._id

		const response = await db.collection(USER).removeOne({_id: db.ObjectId(_id)})
		res.json(response)
	},

	create: async function(req, res){

		const db = await mongo
		const user = Object.assign({}, req.body)

		// Important step //
		await validate(USER, user)

		const response = await db.collection(USER).insertOne(user)
		res.json(response.ops)
	}
}