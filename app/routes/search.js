var express = require('express');
var router = express.Router();

var searchcontroller = require('../controllers/Search');
var validations = require('../validations/Search');
/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('This is search controller');
});

router.route('/name').post(validations.name,searchcontroller.name);
router.route('/sendrequest').post(validations.sendrequest,searchcontroller.sendrequest);

module.exports = router;