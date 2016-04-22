var nodemailer = require("nodemailer");
var models = require('../models');

sendEmail = function(from_name,from_email,to_name,to_email,subject,message) {
	var smtpTransport = nodemailer.createTransport();
    var mail = {
        from: from_name + "<"+from_email+">",
        to: to_email,
        subject: subject,
        html: message
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
}

verifyToken = function(_token,callback) {
    var token = new Buffer(_token, 'base64')
    var src_token = token.toString();
    var cred = src_token.split('|');
    var date= new Date();
    models.User.findOne({
        attributes: ['id'],
        where: {
                id: cred[0],
                remember_token: _token,
                expire_time: {
                      $gte: date 
                }
        }
    }).then(function (token_user) {
            var currentDate = new Date();
            currentDate.addDays(5);
            var dd = currentDate.getDate();
            var mm = currentDate.getMonth()+1;
            var yyyy = currentDate.getFullYear();
            var h = currentDate.getHours();
            var m = currentDate.getMinutes();
            var s = currentDate.getSeconds();

            var expire = yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;

            models.User.update({
              expire_time: expire,
            }, {
              where: {
                id: cred[0]
              }
            });
            return callback(token_user);
    });
}


Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};