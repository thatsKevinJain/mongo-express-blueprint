var routes = require('../config/routes')

function createIndex(db){
	return Object.keys(routes)
	.filter(function (route) {
		var model = require(`../api/models/${route}`)
		if(model.hasOwnProperty('index'))
			return true;
	})
	.map(function (route) {
		var model = require(`../api/models/${route}`)

		if(model.index.keys && model.index.options){
			return db.collection(route.toLowerCase()).createIndex(model.index.keys, model.index.options);
		}
	});
}

module.exports = function(db){
	return Promise.all(createIndex(db))
}