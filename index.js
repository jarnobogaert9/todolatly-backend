require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database/config');
const PORT = process.env.PORT || 5000;

const API_V1 = '/api/v1'

const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');

db.connect().then(() => {
    console.log("Connected to database.");
});

app.use(express.json());
app.use(cors());

app.use(`${API_V1}/users`, userRoutes);
app.use(`${API_V1}/todos`, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
})