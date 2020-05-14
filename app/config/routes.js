module.exports = {

	/*
		Model name and its allowed API actions methods are added here
	*/

	Queue: {
		add: ['post'],
		fetch: ['get'],
		delete: ['get']
	}
}