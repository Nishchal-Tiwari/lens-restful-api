const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/databaseConnections');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const xss = require('xss-clean');
const app = express();

connectDB();

//It is used to parse user input basically in PUT and POST requests
app.use(bodyParser.json());
//For sanitizing user input from client side
app.use(xss());

// Configuration for swagger-ui
const swaggerDocument = YAML.load('./api-doc.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes for the API
app.use('/api/auth', authRoutes);

// Error handling for the API
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Configuration for the API
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;