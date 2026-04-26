const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/doc_manager')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/files', fileRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));