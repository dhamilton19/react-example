import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import News from '../News';
import './style.css';

class App extends Component {
  componentWillMount() {
    if (this.props.articles.length === 0) {
      this.props.fetchArticles();
    }
  }
  render() {
    return (
      <div className="main">
        {this.props.articles
          ? <News articles={this.props.articles} />
          : <Loader>Loading</Loader>}
      </div>
    );
  }
}

App.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

export default App;
