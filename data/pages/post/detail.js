const {text, textWithImage} = require("../../factories/text");
const {accordions} = require("../../factories/accordion");
const {recentArticles} = require("../../factories/post");
const {members} = require("../../factories/member");
const {downloadsInline} = require("../../factories/download");
module.exports = {
	entry: {
		title: 'News Detail',
		posDate: new Date(),
		contentBlocksNeo: {
			level: () => ({
				all: () => ([
					text,
					textWithImage('left'),
					textWithImage('right'),
					accordions(4),
					recentArticles,
					members(2),

					downloadsInline(3),
					downloadsInline(2),
				])
			})
		}
	},
}
