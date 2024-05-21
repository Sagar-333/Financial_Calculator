// App.js

import React from 'react';
import FormComponent from './FormComponent';
import ResultPage from './ResultPage'; // Import the ResultPage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <h1 className='head_text'>
          Financial
          <span className='orange_gradient '> Calculator</span>
        </h1>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/result" element={<ResultPage />} /> {/* Route for ResultPage */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
