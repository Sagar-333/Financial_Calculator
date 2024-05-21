// ResultPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const total = new URLSearchParams(location.search).get('total');

  return (
    <div>
      <h2>Result</h2>
      <p>Total: {total}</p>
    </div>
  );
};

export default ResultPage;
