var express = require('express');
var router = express.Router();

var usercontroller = require('../controllers/Users');
var validations = require('../validations/Users');
/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('This is user controller');
});

router.route('/signup').post(validations.signup,usercontroller.signup);
router.route('/login').post(validations.login,usercontroller.login);
router.route('/verifycode').post(validations.verifycode,usercontroller.verifycode);
router.route('/forgotpassreq').post(validations.forgotpassreq,usercontroller.forgotpassreq);
router.route('/forgotpasschange').post(validations.forgotpasschange,usercontroller.forgotpasschange);
router.route('/photoupload').post(usercontroller.photoupload);
//router.route('/sendemail').post(usercontroller.sendemail);




module.exports = router;
