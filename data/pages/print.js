const {text, textWithImage} = require("../factories/text");
const {accordions} = require("../factories/accordion");
const {members} = require("../factories/member");
const {recentArticles} = require("../factories/post");
const {downloadsInline} = require("../factories/download");

module.exports = {
	entry: {
		title: "Sophie Guyer",
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


const createInlineDownloads = () => ({
	type: {
		handle: 'inlineDownloads'
	}
});


