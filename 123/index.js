const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dashboardDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the data
const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Define API routes
app.get('/api/data', (req, res) => {
  Data.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json(data);
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
