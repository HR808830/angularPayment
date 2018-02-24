var user = require ('../controller/user.js');
var express = require ('express');
var jwt = require ('jsonwebtoken');
var apiRoutes = express.Router();
var config = require ('../config');
var mongoose  = require ('mongoose');
var Schema = mongoose.Schema;
var bcrypt  = require ('bcrypt-nodejs');
var payment = require ('../controller/payment.js');



module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    apiRoutes.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers.token;
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.',
                        data: null
                    });
                } else {
                    req.user = decoded._doc;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.',
                data: null
            });
        }
    });

    app.use('/api', apiRoutes);

    // login Auth
    app.post('/userLogin', user.login); // User Login
    app.post('/userRegister', user.register); // User Register
    app.post('/socialLogin', user.sociallogin); // User Login
    app.get('/api/myprofile/',user.myprofile);
    app.post('/api/changepassword',user.changePassword);
    app.post('/api/updateMyProfile',user.myProfileUpdate);
    app.post('/image/upload',user.imageUpload);
    
    app.post('/createHash',payment.payupayment);
    app.post('/paymentStatus',payment.paymentStatus);
    app.get('/paymentCancel',payment.paymentCancel);
    app.post('/api/paymentapproved', payment.paymentApprove);

    app.post('/api/stripePayment', payment.stripePayment);
  
};
