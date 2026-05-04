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
          createArticles(),
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
  redactorText: `<p>Ab Mittwoch, 17. Februar bis ca. 8. März 2021 stehen wegen Bauarbeiten rund um das AZ Sophie Guyer keine Besucherparkplätze zur Verfügung!</p>`
});

const createArticles = () => ({
  type: {
    handle: 'articles'
  }
})
