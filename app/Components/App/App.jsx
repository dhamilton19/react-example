import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import News from '../News/News';
import Loader from '../Loader/Loader';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.articles.length === 0) {
      this.props.fetchArticles(this.props.query);
    }
  }

  handleChange(event) {
    this.props.updateSearchQuery(event.target.value);
  }

  renderPageBody() {
    if (this.props.isSearchInFlight) {
      return <Loader />;
    } else if (this.props.articles.length > 0) {
      return <News articles={this.props.articles} />;
    }
    return <p>Sorry, there are no search results.</p>;
  }

  render() {
    return (
      <div className="main">
        <Header
          query={this.props.query}
          onChange={this.handleChange}
          onSearch={this.props.fetchArticles}
        />
        {this.renderPageBody()}
      </div>
    );
  }
}

App.propTypes = {
  query: PropTypes.string.isRequired,
  isSearchInFlight: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
};

export default App;
