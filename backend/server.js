const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/formdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mongoose Model
const FormData = mongoose.model('FormData', {
  currentAge: Number,
  retirementAge: Number,
  annualIncome: Number,
  incomeGrowthRate: Number,
  currentSavings: Number,
  monthlyExpenses: Number
});

// Routes
app.post('/submit-form', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).send(formData);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post('/calculate', async (req, res) => {
  try {
    const { currentAge, retirementAge, annualIncome, incomeGrowthRate, currentSavings, monthlyExpenses } = req.body;
    const n = retirementAge - currentAge ;
    const x = Math.pow(1.06, n);
    const xRounded = parseFloat(x.toFixed(2));
    const FV = monthlyExpenses*xRounded;
    const P = FV*12;
    const numPOW = Math.pow((1.08/1.06),20);
    const nume = numPOW-1;
    const deno = 0.02;
    const divi = nume/deno;
    const total = P*divi;
    res.status(200).json({ total });
  } catch (error) {
    res.status(400).send(error);
  }
});



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
