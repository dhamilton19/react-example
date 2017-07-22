import { connect } from 'react-redux';
import App from '../components/App';
import { fetchArticles } from '../actions/articlesActions';

const mapStateToProps = state => ({
  articles: state.articles,
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
