function user() { };
user.prototype.constructor = user;

//Function to signup user
user.prototype.signup =  function(req, res, next) {
    req.checkBody('first_name', 'First Name is required').notEmpty();
    req.checkBody('last_name', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    next();
}


//Function to login user
user.prototype.login =  function(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    next();
}

//Function to verifycode user
user.prototype.verifycode =  function(req, res, next) {
    req.checkBody('verify_code', 'Verification code is required').notEmpty();
    req.checkBody('user_id', 'User id is required').notEmpty();
    next();
}

//Function to forgot password
user.prototype.forgotpassreq =  function(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    next();
}

//Function to forgot password
user.prototype.forgotpasschange =  function(req, res, next) {
    req.checkBody('verify_code', 'Verify code is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('cpassword', 'Confirm Password is required').notEmpty();
    req.checkBody('cpassword','Password donot match').equals(req.body.password);
    req.checkBody('user_id', 'User ID is not valid').notEmpty();
    next();
}

module.exports = new user();
