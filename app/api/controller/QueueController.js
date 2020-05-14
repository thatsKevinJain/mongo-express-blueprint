// Collection Name //
const TEST = 'test'

module.exports = {

	fetch: function(req, res){

		req.db.collection(TEST).find({}).toArray()
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	delete: function(req, res){

		req.db.collection(TEST).removeOne({})
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	add: function(req, res){
		
		req.db.collection(TEST).insertOne(req.body)
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	}
}