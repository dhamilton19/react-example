import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const renderArticle = article => {
  return (
    <div key={article.id}>
      <a
        href={article.url}
        className="article-container"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="article-container">
          <div className="article-img-container">
            <img src={article.img} className="article-img" />
          </div>
          <div className="article-info-container">
            <h3 className="article-title">
              {article.title}
            </h3>
            <h5>
              {article.description}
            </h5>
            <h5 className="article-date">
              by {article.author} | {article.date}
            </h5>
          </div>
        </div>
      </a>
      <hr />
    </div>
  );
};

function News({ articles }) {
  return (
    <div className="articles">
      {articles.map(renderArticle)}
    </div>
  );
}

News.propTypes = { articles: PropTypes.array.isRequired };

export default News;
