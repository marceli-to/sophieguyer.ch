const faker = require('faker');
const constants = require("constants");

const member = () => ({
	memberImage: () => ({
		one: () => ({
			getUrl: () => '/assets/images/square-image.jpg'
		})
	}),
	firstname: faker.name.firstName,
	lastname: faker.name.lastName,
	eMail: faker.internet.email().toLowerCase(),
	position: faker.name.jobTitle,
	theme: () => {
		const shuffled = ['green', 'blue', 'red', 'orange']
			.sort(() => (Math.random() > .5) ? 1 : -1);
		return shuffled.pop();
	}
});

const members = (count) => ({
	type: {
		handle: 'team'
	},
	team: {
		all: () => {
			return Array(count).fill(member);
		}
	}
});

const team = (count) => ({
	type: {
		handle: 'team'
	},
	titel: faker.lorem.words(3),
	team: {
		all: () => {
			return Array(count).fill(member);
		}
	}
})

module.exports = {
	members,
	team
}
