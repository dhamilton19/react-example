require('isomorphic-fetch');

export const getArticles = () => {
  return new Promise((resolve) => {
    fetch('/articles')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
};
