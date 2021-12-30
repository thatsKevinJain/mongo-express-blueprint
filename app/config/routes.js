module.exports = {

	/*
		Model name and its allowed API actions methods are added here
	*/

	Queue: {
		create: ['post'],
		find: ['get'],
		delete: ['get']
	}
}