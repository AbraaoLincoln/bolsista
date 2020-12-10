const express = require('express')
const path = require('path');
let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('gerenciametoSetor.html', {root: path.join(__dirname, '../../views/dashBoardGerenteSetor')});
});

module.exports = router;