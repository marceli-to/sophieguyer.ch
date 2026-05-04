module.exports = {
	entry: {
		title: 'News',
		headerImage: {
			one: () => ({
				getUrl: () => '/assets/images/header.jpg'
			}),
			title: 'HeaderImage Title'
		},
		contentBlocksNeo: {
			level: () => ({
				all: () => ([
					createText(),
					createLocation(),
					createMaps()
				])
			})
		}
	},
}

const createText = () => ({
	type: {
		handle: 'text'
	},
	titel: 'Mein Supper Titel',
	redactorText: `Ab Mittwoch, 17. Februar bis ca. 8. März 2021 stehen wegen Bauarbeiten rund um das AZ Sophie Guyer keine Besucherparkplätze zur Verfügung!`
});

const createLocation = () => ({
	type: {
		handle: 'location'
	},
});

const createMaps = () => ({
	type: {
		handle: 'googleMaps'
	}
})
