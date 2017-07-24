const request = require('request');
const parseString = require('xml2js').parseString;

function handleWebServiceCall(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        resolve(body);
      } else {
        reject({ error });
      }
    });
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
    article.title.toLowerCase().includes(match.toLowerCase()),
  );
}

function sortArticles(articles) {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getAuthor(data) {
  return JSON.parse(data).ubernode.name;
}

function getAuthors(articles) {
  const serviceCalls = [];
  return new Promise(resolve => {
    articles.forEach(({ id }) => {
      serviceCalls.push(
        handleWebServiceCall(
          `https://www.nasa.gov/api/1/record/node/${id}.json`,
        ),
      );
    });
    Promise.all(serviceCalls).then(data => {
      const newArticles = articles.map((article, i) =>
        Object.assign({}, article, { author: getAuthor(data[i]) }),
      );
      resolve(newArticles);
    });
  });
}

module.exports = (app, path) => {
  app.post('/articles', (req, res) => {
    handleWebServiceCall('https://www.nasa.gov/rss/dyn/breaking_news.rss')
      .then(result => {
        return parseXMLToJSON(result);
      })
      .then(result => {
        return getAuthors(
          sortArticles(
            filterArticles(
              mapArticles(resolveNewsItems(result)),
              req.body.query,
            ),
          ),
        );
      })
      .then(result => {
        res.send(JSON.stringify(result));
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};
