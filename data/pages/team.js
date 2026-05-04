const {team} = require("../factories/member");
module.exports = {
	entry: {
		title: "Team",
		headerImage: {
			one: () => ({
				getUrl: () => '/assets/images/header.jpg'
			}),
			title: 'HeaderImage Title'
		},
		contentBlocksNeo: {
			level: () => ({
				all: () => ([
					team(4),
					team(8),
					team(2),
				])
			})
		}
	},
}
