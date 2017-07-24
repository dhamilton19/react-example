import { connect } from 'react-redux';
import App from '../Components/App/App';
import { fetchArticles } from '../actions/articlesActions';
import { updateQuery } from '../actions/searchActions';

const mapStateToProps = state => ({
  articles: state.articles,
  query: state.header.query,
  isSearchInFlight: state.header.isSearchInFlight,
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: query => dispatch(fetchArticles(query)),
  updateSearchQuery: query => dispatch(updateQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
