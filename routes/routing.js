const express = require('express');
const expbs = require('express-handlebars');
const path = require('path');

// Routers
const router = express.Router();

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
            tittle: '大家來學ㄅㄆㄇ | 聽力練習',
            style: 'style.css'
        });
});

module.exports = router;