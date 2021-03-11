import React from 'react';
import ReactDom from 'react-dom';
import Router from './Router/Routes';
import './index.css';

const Index = () => {
  return (
    <React.Fragment>
      <Router />
    </React.Fragment>
  );
};

ReactDom.render(<Index />, document.getElementById('root'));
