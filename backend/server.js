const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Load data from file
const loadData = () => {
  if (fs.existsSync('data.json')) {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
  }
  return { startDate: '', endDate: '', tableData: [] };
};

// Save data to file
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Handle root route
app.get('/', (req, res) => {
  res.send('Server is running. Use /data endpoint to get or post data.');
});

app.get('/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.post('/data', (req, res) => {
  const data = req.body;
  saveData(data);
  res.json({ message: 'Data saved successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
