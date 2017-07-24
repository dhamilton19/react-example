import React from 'react';
import './spinner.gif';
import './style.css';

function Loader() {
  return (
    <div>
      <img className="loader" src="./spinner.gif" />
    </div>
  );
}

export default Loader;
