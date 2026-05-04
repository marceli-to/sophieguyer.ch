const {downloads} = require('../factories/download');
module.exports = {
	entry: {
		title: "Downloads",
		headerImage: {
			one: () => ({
				getUrl: () => '/assets/images/header.jpg'
			}),
			title: 'HeaderImage Title'
		},
		contentBlocksNeo: {
			level: () => ({
				all: () => ([
					downloads(3),
					downloads(2),
					downloads(1)
				])
			})
		}
	}
}
