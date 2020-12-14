const express = require('express')
const path = require('path');
let router = express.Router();
const promisify = require('../../DB/promisify');
const dbCon = require('../../DB/dbCon');

router.get('/', async (req, res) => {
    try {
        let sql = 'select * from justificativa_e_dia';
        let rS = await promisify(dbCon, sql);
        res.json({status: 'ok', result: rS});
    } catch (err) {
        console.log(err)
        res.json({status: 'error'})
    }
});

module.exports = router;