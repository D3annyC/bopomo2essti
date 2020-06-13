const express = require('express');
const router = express.Router();
const bopomo = require('../../public/bopomo');


router.get('/', (req, res) => {
    try {
        res.json(bopomo);
    } catch (err) {
        res.json({ mesg: err });
    }
});


module.exports = router;