// App.jsx

import React from 'react';
import FormComponent from './FormComponent';
import "./App.css"

const App = () => {
  return (
    <div>
      <h1 className='head_text'>
        Financial
        <span className='orange_gradient '> Calculator</span>
      </h1>
      <FormComponent />
    </div>
  );
};

export default App;
