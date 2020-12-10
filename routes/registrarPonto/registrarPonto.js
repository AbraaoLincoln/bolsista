const express = require('express')
const path = require('path');
let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('registroPonto.html', {root: path.join(__dirname, '../../views/registroPonto')});
});

module.exports = router;