const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('./middleware/logger');
const bopomo = require('./public/bopomo');

const PORT = process.env.PORT || 3000;

// Loogger
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Build Main page Router
app.get('/', (req, res) => {
    res.render('index', { bopomo });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/bopomo', require('./routes/api/bopomo'));


app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
module.exports = app;
