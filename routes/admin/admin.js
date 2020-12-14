const express = require('express')
const path = require('path');
let router = express.Router();
// const promisify = require('../../DB/promisify');
// const dbCon = require('../../DB/dbCon');

router.get('/', (req, res) => {
    res.sendFile('admin.html', {root: path.join(__dirname, '../../views/admin')});
});

module.exports = router;