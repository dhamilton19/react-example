import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const renderArticle = article => {
  return (
    <div>
      <a
        href={article.url}
        key={article['dc:identifier']}
        className="article-container"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="article-container">
          <div className="article-img-container">
            <img src={article.img} className="article-img" />
          </div>
          <div className="article-info-container">
            <h3>
              {article.title}
            </h3>
            <h5>
              {article.description}
            </h5>
            <h5 className="article-author">
              by {article.author}
            </h5>
            <h5 className="article-date">
              {article.date}
            </h5>
          </div>
        </div>
      </a>
      <hr />
    </div>
  );
};

const renderArticles = articles => articles.map(renderArticle);

function News({ articles }) {
  return (
    <div className="articles">
      {renderArticles(articles)}
    </div>
  );
}

News.propTypes = { articles: PropTypes.array.isRequired };

export default News;
