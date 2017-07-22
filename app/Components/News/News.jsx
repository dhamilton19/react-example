import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import './style.css';

const renderArticle = article => {
  return (
    <a
      href={article.url}
      key={article['dc:identifier']}
      className="article-container"
    >
      <div className="article-container">
        <div className="article-img-container">
          <Image src={article.img} size="medium" />
        </div>
        <div className="article-info-container">
          <h3>
            {article.title}
          </h3>
          <h5>
            {article.description}
          </h5>
          <h5 className="article-date">
            {article.date}
          </h5>
        </div>
      </div>
    </a>
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
