import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './FormComponent.css'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    currentAge: '',
    retirementAge: '',
    annualIncome: '',
    incomeGrowthRate: '',
    currentSavings: '',
    savedWhere: [],
    monthlyExpenses: ''
  });

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse form data fields to integers
      const parsedData = {
        ...formData,
        currentAge: parseInt(formData.currentAge),
        retirementAge: parseInt(formData.retirementAge),
        annualIncome: parseInt(formData.annualIncome),
        incomeGrowthRate: parseInt(formData.incomeGrowthRate),
        currentSavings: parseInt(formData.currentSavings),
        monthlyExpenses: parseInt(formData.monthlyExpenses)
      };
  
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData) // Send parsed form data
      });
  
      // Log the response
      console.log('Response:', response);
  
      const data = await response.json();
      console.log('Data:', data);
      navigate(`/result?total=${data.total}`); // Navigate to the result page
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSavedWhereChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, savedWhere: [...formData.savedWhere, value] });
  };

  return (
    <div>
      <h2>Financial Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentAge">Current Age:</label>
        <input type="number" id="currentAge" name="currentAge" value={formData.currentAge} onChange={handleChange} />

        <label htmlFor="retirementAge">Retirement Age:</label>
        <input type="number" id="retirementAge" name="retirementAge" value={formData.retirementAge} onChange={handleChange} />

        <label htmlFor="annualIncome">Annual Income:</label>
        <input type="number" id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} />

        <label htmlFor="incomeGrowthRate">Income Growth Rate:</label>
        <input type="number" id="incomeGrowthRate" name="incomeGrowthRate" value={formData.incomeGrowthRate} onChange={handleChange} />

        <label htmlFor="currentSavings">Current Savings:</label>
        <input type="number" id="currentSavings" name="currentSavings" value={formData.currentSavings} onChange={handleChange} />

        <label htmlFor="monthlyExpenses">Monthly Expenses:</label>
        <input type="number" id="monthlyExpenses" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
