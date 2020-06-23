const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 3000;
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
});

app.use(express.static('public'));

// Set up templet engining
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Router
const router = express.Router();
app.use('/', router);

router.get('/', (req, res) => {
    res.render('index',
        {
            tittle: '大家來學ㄅㄆㄇ',
            style: 'style.css'
        });
});

router.get('/bopomo2voice', (req, res) => {
    res.render('bopomo2voice',
        {
            tittle: '大家來學ㄅㄆㄇ',
            style: 'style.css'
        });
});

// // Loogger
// app.use(logger);


app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
module.exports = app;
