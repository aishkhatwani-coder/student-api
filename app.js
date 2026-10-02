const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let students = [
  { id: 1, name: 'Rohan Sharma', marks: 85, passed: true },
  { id: 2, name: 'Priya Patel', marks: 92, passed: true }
];

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Student Records Service is running 🚀'
  });
});

// GET all students
app.get('/api/students', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: students
  });
});

// POST add a new student
app.post('/api/students', (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined) {
    return res.status(400).json({
      status: 'failed',
      message: 'Both name and marks are required'
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    marks: Number(marks),
    passed: Number(marks) >= 40
  };

  students.push(newStudent);
  res.status(201).json({
    status: 'success',
    data: newStudent
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}