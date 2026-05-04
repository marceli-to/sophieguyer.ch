const faker = require('faker');

const text =  () => ({
	type: {
		handle: 'text'
	},
	titel: faker.lorem.words(4),
	redactorText: '<p>' + faker.lorem.paragraphs(1) + '</p>' +
		          '<p>' + faker.lorem.paragraphs(1) + '</p>'
});

const textWithImage = (position) => ({
	type: {
		handle: 'text'
	},
	align: position,
	titel: faker.lorem.words(4),
	redactorText: '<p>' + faker.lorem.paragraphs(1) + '</p>' +
		          '<p>' + faker.lorem.paragraphs(1) + '</p>',
	image: {
		one: () => ({
			getUrl: () => '/assets/images/square-image.jpg'
		})
	}
});




module.exports = {
	text,
	textWithImage
}
