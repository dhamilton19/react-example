require('isomorphic-fetch');

export const getArticles = query => {
  return new Promise(resolve => {
    fetch('/articles', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(articles => {
        resolve(articles);
      });
  });
};
