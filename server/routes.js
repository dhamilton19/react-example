const request = require('request');
const parseString = require('xml2js').parseString;

function handleWebServiceCall() {
  return new Promise((resolve, reject) => {
    request(
      'https://www.nasa.gov/rss/dyn/breaking_news.rss',
      (error, response, body) => {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject({ error });
        }
      },
    );
  });
}

function parseXMLToJSON(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject();
      }
      resolve(result);
    });
  });
}

function resolveNewsItems(result) {
  return result.rss.channel[0].item;
}

function mapArticles(articles) {
  return articles.map(article => ({
    img: article.enclosure[0].$.url,
    title: article.title[0],
    description: article.description[0],
    id: article['dc:identifier'][0],
    date: article.pubDate[0],
    url: article.link[0],
  }));
}

function filterArticles(articles, match) {
  return articles.filter(article =>
    article.title.toLowerCase().includes(match),
  );
}

function sortArticles(articles) {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = (app, path) => {
  app.get('/articles', (req, res) => {
    handleWebServiceCall()
      .then(result => {
        return parseXMLToJSON(result);
      })
      .then(result => {
        res.send(
          JSON.stringify(
            sortArticles(
              filterArticles(mapArticles(resolveNewsItems(result)), 'space'),
            ),
          ),
        );
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};
