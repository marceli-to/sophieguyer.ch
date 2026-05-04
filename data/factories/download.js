const faker = require('faker');

const download = () => ({
	getUrl: () => '/assets/images/square-image.jpg',
	title: faker.lorem.words(2),
});

const downloads = (count) => ({
	type: {
		handle: 'downloads'
	},
	titel: faker.lorem.words(3),
	downloads: () => ({
		all: () => Array(count).fill(download)
	})
});

const downloadsInline = (count) => ({
	type: {
		handle: 'downloads'
	},
	style: 'inline',
	downloads: () => ({
		all: () => Array(count).fill(download)
	})
})

module.exports = {
	downloads,
	downloadsInline,
}
