const faker = require('faker');

const accordion = () => ({
	titel: faker.lorem.words(3),
	text: '<p>' + faker.lorem.paragraphs(1) + '</p>' +
		  '<p>' + faker.lorem.paragraphs(1) + '</p>'
});

const accordions = (count) => ({
	type: {
		handle: 'accordion'
	},
	item: {
		all: () => {
			return Array(count).fill(accordion);
		}
	}
})

module.exports = {
	accordions
}
