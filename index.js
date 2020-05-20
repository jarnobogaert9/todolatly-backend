require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/config');
const PORT = process.env.PORT || 4000;

const API_V1 = '/api/v1'

const userRoutes = require('./routes/users');

db.connect().then(() => {
    console.log("Connected to database.");
});

app.use(express.json());

app.use(`${API_V1}/users`, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
})