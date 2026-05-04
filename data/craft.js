const {post} = require("./factories/post");
const faker = require('faker');
const moment = require('moment');

module.exports = {
	craft: {
		navigation: {
			nodes: (scope) => {
				switch (scope){
					case 'navigation':
						return {
							level: (level) => ({
								all: () => ([
									{
										title: "Sophie Guyer",
										url: "/",
										hasDescendants: true,
										children: {
											all: () => [
												{
													title: "Alterszentrum mit Aussicht",
													url: "#mein-supper-titel0",
												},
												{
													title: "Geschichte",
													url: "/"
												},
												{
													title: "Team",
													url: "/team.html"
												},
												{
													title: "Offene Stellen",
													url: "/"
												},
												{
													title: "Downloads",
													url: "/downloads.html"
												}

											],
										},
									},
									{
										title: "Wohnen",
										url: "/wohnen.html"
									},
									{
										title: "Spitex",
										url: "/spitex.html"
									},
									{
										title: "Hotellerie",
										url: "/gastro.html"
									},
									{
										title: "Aktivitäten",
										url: "/aktivitaeten.html"
									},
									{
										title: "News",
										url: "/news.html"
									},
									{
										title: "Kontakt",
										url: "/kontakt.html"
									}
								])
							})
						};
					case 'footer':
						return {
							all: () => ([
								{
									link: `<a href="/login.html" title="Login">Login</a>`
								},
								{
									link: `<a href="/impressum.html" title="Impressum">Impressum</a>`
								},
								{
									link: `<a href="/datenschutz.html" title="Datenschutz">Datenschutz</a>`
								},
								{
									link: `<a href="https://stoz.ch" title="Stoz" target="_blank">design by stoz</a>`
								}
							])
						}
					default:
						return {};
				}
			}
		},
		entries: () => ({
			section: (type) => {
				switch (type){
					case 'articles':
						return {
							limit: (numberOfArticles) => ({
								all: () => createArticles(numberOfArticles)
							}),
						}
				}
			}
		}),
		categories: () => ({
			group: () => ({
				orderBy: () => ({
					all: () => new Array(7).fill({
						title: faker.commerce.department,
						slug: faker.commerce.department
					})
				})
			})
		}),
		calendar: {
			events: () => ({
				all: () => new Array(10).fill(createEvent)
			})
		},
		app: {
			request: {
				segments: [
					'aktivitaeten'
				]
			}
		}
	}
}

const createArticles = (count) => {
	return Array(count).fill(post)
}

const createEvent = () => {
	return {
		startDate: {
			format: (format) => {
				return moment(faker.date.future()).format(format);
			}
		},
		title: faker.lorem.words(3),
		location: {
			all: () => [{
					title: faker.lorem.words(3)
				}]
		},
		targetAudience: {
			all: () => [{
					title: faker.commerce.department
			}]
		}
	}
}
