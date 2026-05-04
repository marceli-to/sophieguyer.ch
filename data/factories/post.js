const faker = require('faker');

const post = () => ({
	postDate: faker.date.past,
	title: faker.lorem.words(3),
	teaser: '<p>'+ faker.lorem.paragraphs(1) + '</p>',
	url: '/post/detail.html'
});

const recentArticles = () => ({
	type: {
		handle: 'recentArticles'
	},
});

module.exports = {
	post,
	recentArticles
}
