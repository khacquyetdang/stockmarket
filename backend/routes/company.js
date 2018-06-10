var express = require('express');
var router = express.Router();
var companyCtrl = require('../controllers/company');
/* GET users listing. */
router.get('/list', companyCtrl.list);

module.exports = router;