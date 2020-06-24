const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
const router = require('./routes/routing');

const PORT = process.env.PORT || 3000;
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
});

app.use(express.static('public'));
app.use('/', router);

// Set up templet engining
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
module.exports = app;
