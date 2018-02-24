var mongoose = require ('mongoose');
var config = require ('../config');
var jwt = require ('jsonwebtoken');
var async = require ('async');
var qs = require ('querystring');
var chalk = require ('chalk');
var sha512 = require('js-sha512');

var register = mongoose.model("user");
var payment = mongoose.model("payment");
// var stripe = require('stripe')('pk_test_key');
var stripe = require('stripe')('sk_test_key');

exports.payupayment = function(req, res) {

  var btoa = require('btoa'),bin = req.body.preHashString, b64 = btoa(bin);
  var salt = '44TxaQwVXB';
  var hash = sha512(req.body.preHashString + salt);
  res.send({success : true, hash: hash,b64:b64});
};
exports.paymentStatus = function(req, res) {
  var btoa = require('btoa'),bin = req.body.txnid, b64 = btoa(bin);
  var paymentdata ={
    txtnId:req.body.txnid,
    amount:req.body.amount,
    email:req.body.email,
    phoneNumber:req.body.phone,
    paymentDate:req.body.addedon,
    status:req.body.status
  }
  // res.writeHead(301,{Location: 'http://localhost:4200/paymentSucess/'+req.body.txnid});
  payment.create(paymentdata, function(err, money) {
    if (!err) {
      console.log("money....................");
      //res.writeHead(301,{Location: 'http://www.avitez.in/#/create-appointment/pay'+req.body.txnid});
      res.writeHead(301,{Location: 'http://localhost:4200/paymentSucess/'+req.body.txnid});
      res.end();
    }else{
      console.log("error....................");
      //res.writeHead(301,{Location: 'http://www.avitez.in/#/create-appointment/pay'+req.body.txnid});
      res.writeHead(301,{Location: 'http://localhost:4200/paymentSucess/'+req.body.txnid});
      res.end();
    }
  });	
};
exports.paymentCancel = function(req, res) {
  console.log("payment cancel............");
  res.writeHead(301,{Location: 'http://localhost:4200'});
  // res.writeHead(301,{Location: 'http://www.avitez.in/#/create-appointment/pay'});
  res.end();
};
exports.paymentApprove = function(req, res) {
    console.log(req.body);
    var users = req.user;
    payment.findOne({'txtnId':req.body.txtnId},function(err,result){
      console.log(result);
      var paymentdata ={
          txtnId:result.txtnId,
          amount:result.amount,
          email:result.email,
          phoneNumber:result.phoneNumber,
          paymentDate:result.paymentDate,
          status:result.status,
          paymentType: 'PayuMoney'
      }
      if (err) {
          res.json({"code" : 403, "status" : "Error","message" : "Error Transation Id Not Found"});
          return;
      } else if (result) {
        var options = { new: true }; //so that user returned is the updated not original doc
        register.findByIdAndUpdate(users._id, { paymentType: result.status,$push: { paymentHistory: paymentdata } }, options, function(err, user) {
          if (!err) {
            console.log(chalk.green("### Update data Message:.....",user));
            payment.findByIdAndRemove(result._id,function(err,okay){
              if(!err){
                res.json({"code" : 200, "status" : "Success","message" : "User get payment ","data":result.status});
              }else{
                res.json({"code" : 200, "status" : "Success","message" : "User get payment ","data":result.status});
              }
            });
          }else{
            console.log(chalk.red("### Error Message: User id not found....."));
            res.json({
              "code": 403,
              "status": "Error",
              "message": "Please Contact to Admin",
              "data":result.status
            });
          }
        });
      } 
    });
};
// stripe Payment
exports.stripePayment = function(req, res) {
  var users = req.user;
  stripe.charges.create({
    amount: 2000,
    currency: "aud",
    source: req.body.tokenID, // obtained with Stripe.js
    description: "Charge for HR Managemant"
  }, function(err, charge) {
    if(charge){

      var paymentdata ={
          txtnId:charge.id,
          amount:charge.amount / 100,
          email:charge.source.name,
          phoneNumber:'',
          paymentDate:new Date(),
          status:charge.status,
          paymentType: 'Stripe'
      }
      console.log("charge..........................",charge);
      var options = { new: true };
      register.findByIdAndUpdate(users._id, { paymentType: charge.status,$push: { paymentHistory: paymentdata } }, options, function(err, user) {
        if (!err) {
          console.log(chalk.green("### Update data Message:.....",charge));
          res.json({"code" : 200, "status" : "Success","message" : "User get payment ","data":charge});
        }else{
          console.log(chalk.red("### Error Message: User id not found....."));
          res.json({
            "code": 403,
            "status": "Error",
            "message": "Please Contact to Admin",
            "data":charge
          });
        }
      });
    }else{
      console.log(chalk.red("### Error Message: stripe not found....."));
      res.json({
        "code": 403,
        "status": "Error",
        "message": "Please Contact to stripe",
        "data":err
      });
    }
  });
};






