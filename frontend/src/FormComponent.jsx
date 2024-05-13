// FormComponent.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css'; // Import CSS file

const FormComponent = () => {
  const [formData, setFormData] = useState({
    currentAge: '',
    retirementAge: '',
    annualIncome: '',
    incomeGrowthRate: '',
    currentSavings: '',
    savedWhere: 'FD',
    monthlyExpenses: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-form', formData);
      alert('Form data submitted successfully');
    } catch (error) {
      alert('Error submitting form data');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Enter your information:</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Current Age:
          <input type="number" name="currentAge" value={formData.currentAge} onChange={handleChange} />
        </label>
        <br />
        <label>
          Retirement Age:
          <input type="number" name="retirementAge" value={formData.retirementAge} onChange={handleChange} />
        </label>
        <br />
        <label>
          Annual Income:
          <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} />
        </label>
        <br />
        <label>
          Income Growth Rate (%):
          <input type="number" name="incomeGrowthRate" value={formData.incomeGrowthRate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Current Savings:
          <input type="number" name="currentSavings" value={formData.currentSavings} onChange={handleChange} />
        </label>
        <br />
        <label>
          Saved Where:
          <select name="savedWhere" value={formData.savedWhere} onChange={handleChange}>
            <option value="FD">FD</option>
            <option value="Mutual Funds">Mutual Funds</option>
            <option value="Stock Market">Stock Market</option>
          </select>
        </label>
        <br />
        <label>
          Monthly Expenses:
          <input type="number" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
