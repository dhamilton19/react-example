import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Header({ query, onChange, onSearch }) {
  return (
    <div className="header">
      <h2>NASA Breaking News</h2>
      <div className="header-search">
        <input
          className="header-input"
          type="text"
          placeholder="Search news titles..."
          value={query}
          onChange={onChange}
        />
        <button
          className="header-button"
          type="button"
          onClick={onSearch.bind(this, query)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Header;
