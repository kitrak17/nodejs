function search() { };
search.prototype.constructor = search;

//Function to search user
search.prototype.name =  function(req, res, next) {
    req.checkBody('_token', 'Token is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();
    next();
}

//Function to send request
search.prototype.sendrequest =  function(req, res, next) {
    req.checkBody('user_id', 'User id is required').notEmpty();
    req.checkBody('request_to', 'Request to is required').notEmpty();
    next();
}

module.exports = new search();
