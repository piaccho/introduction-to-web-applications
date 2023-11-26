var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/id/:value', function (req, res, next) {
    const value = req.params.value;
    // res.render('index', { title: value });
    res.status(200).json(value);
});
router.post('/', function (req, res, next) {
    const value = req.params.value;
    res.render('index', { title: value });
});

module.exports = router;
