var mongoose = require ('mongoose');
var config = require ('../config');
var jwt = require ('jsonwebtoken');
var async = require ('async');
var qs = require ('querystring');
// var moment = require ('moment-timezone');
var chalk = require ('chalk');

var register = mongoose.model("user");


// var multer = require('multer');
// var DIR = './public/uploads/';
// var upload = multer({dest: DIR}).single('photo');
/* GET home page. */

// image Uploaeded code //
    var multer      = require('multer');   //FOR FILE UPLOAD
    var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
        cb(null, './public/uploads');
      },
      filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
      }
    });
    var upload = multer({ //multer settings
      storage: storage
    }).single('photo');

// End Image Uploded


exports.login = function(req, res) {
  var receivedValues = req.body;
  if (JSON.stringify(receivedValues) === '{}' || receivedValues === undefined || receivedValues === null) {
    console.log(chalk.red("### Error Message: User Not available"));
    res.json({
      "code": 403,
      "status": "Error",
      "message": "User Not available!"
    });
    return;
  } else {
    var usercolumns = ["email", "password"];
    for (var iter = 0; iter < usercolumns.length; iter++) {
      var columnName = usercolumns[iter];
      if (receivedValues[columnName] === undefined && (columnName === 'email' || columnName === 'password')) {
        console.log(chalk.red(columnName, " field is undefined"));
        res.json({
          "code": 403,
          "status": "Error",
          "message": columnName + " field is undefined"
        });
        return;
      }
    }
    var user = new register();
    user.email = req.body.email;
    user.password = req.body.password;

    register.findOne({
      'email': req.body.email
    }, function(err, userDetail) {
      if (userDetail !== null) {
        if (userDetail.validPassword(req.body.password)) {
          var authToken = jwt.sign(userDetail, config.secret, {
            expiresIn: 1440 * 60 * 30 // expires in 24 hours
          });
          var data = {
            userId:userDetail._id,
            email: userDetail.email,
            status: "success"
          };
          res.json({
            "code": 200,
            "authToken": authToken,
            "userId":userDetail._id,
            "status":"success"
          });
        } else {
          console.log(chalk.green("### Error Message: Email2 or Password is Worng"));
          res.json({
            "code": 403,
            "status": "Error",
            "message": "Email or Password is Worng"
          });
        }
      } else {
        console.log(chalk.red("### Error Message: Email1 not found"));
        res.json({
          "code": 403,
          "status": "Error",
          "message": "Email not found "
        });
      }
    });
  }
};

exports.register = function(req, res) {
  var receivedValues = req.body;
  if (JSON.stringify(receivedValues) === '{}' || receivedValues === undefined || receivedValues === null) {
    console.log(chalk.red("### Error Message: Invalid Data Enter"));
    res.json({
      "code": 403,
      "status": "Error",
      "message": "Invalid Data Enter"
    });
    return;
  } else {
    register.findOne({
      'email': req.body.email
    }, function(err, user) {
      if (!user) {
        var userdata = new register();
        userdata.password = userdata.generateHash(req.body.password);
        userdata.firstName =req.body.firstName;
        userdata.email = req.body.email;
        userdata.phoneNumber =req.body.phoneNumber;
        userdata.provider = 'Auth Login';

        userdata.save(function(err, login) {
          if (!err) {
            var data = {
              userId: login._id,
              email: login.email,
              status: "success"
            };
            var authToken = jwt.sign(userdata, config.secret, {
              expiresIn: 1440 * 60 * 30 // expires in 1440 minutes
            });
            console.log(chalk.green("### Sucess Message: Account Register...."));
            res.json({
              "code": 200,
              "authToken": authToken,
              "userId":login._id,
              "status":"success"
            });
          } else {
            console.log(chalk.red("### Error Message: Account not  Register...."));
            res.json(false);
          }
        });
      } else {
        console.log(chalk.red("### Error Message: Account already exiting"));
        res.json({
          "code": 403,
          "status": "Error",
          "message": "Account already exiting"
        });
      }
    });
  }
};

exports.myprofile = function(req, res) {
  var users = req.user;
  if(users.email== undefined){
      res.json({"code" : 403, "status" : "Error","message" : "Some feilds are missing"});
      return; 
  }
  else{
    register.findOne({'_id':users._id},function(err,result){
      if (err) {
          res.json({"code" : 403, "status" : "Error","message" : "Error while fetching User"});
          return;
      } else if (result) {
      
          console.log(chalk.green("### Sucess Message: Login user Profile Access...."));
          res.json({"code" : 200, "status" : "Success","message" : "User get ","data":result});
          return;
      } 
    });
  }
};
exports.changePassword = function(req, res) {
  var users = req.user;
  if(users.email== undefined){
      res.json({"code" : 403, "status" : "Error","message" : "Some feilds are missing"});
      return; 
  }
  else{
    register.findOne({'_id':users._id},function(err,result){
      if (err) {
          res.json({"code" : 403, "status" : "Error","message" : "Error while fetching User"});
          return;
      }else {
        console.log(chalk.green("### changePassword permission: Login user Change password....",result,req.body.oldpassword));
        if (result.validPassword(req.body.oldpassword)) {
          console.log(chalk.green("###  permission: Login user Change password....",result));
          var newpassword ={
            password : result.generateHash(req.body.newpassword)
          }
          var options = { new: true }; //so that user returned is the updated not original doc
          register.findByIdAndUpdate(users._id, newpassword, options, function(err, user) {
            if (!err) {
              console.log(chalk.green("### Sucess Message: Login user Change password...."));
              res.json({"code" : 200, "status" : "Success","message" : "User password Change "});
              return;
            }else{
              console.log(chalk.red("### Error Message: password not Change....."));
              res.json({
                "code": 403,
                "status": "Error",
                "message": err
              });
            }
          });
        }else{
          console.log(chalk.green("### Error Message: Old Password not Match"));
          res.json({
            "code": 403,
            "status": "Error",
            "message": "old Password not Match"
          });
        }
      } 
    });
  }
};
exports.imageUpload =function(req, res) {
  // upload(req,res,function(err){
  //     console.log("Uploading.....",req.file.path);
  //     if(err){
  //          res.json({error_code:1,err_desc:err});
  //          return;
  //     }
  //      res.json({error_code:0,err_desc:null,path:req.file.path});
  //      res.json({error_code:0,err_desc:null,filename:req.file.filename});
  // });
  var path = '';
  upload(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured");
     }  
    // No error occured.
     var path = req.file.path;
     return res.send(path); 
  });     
};
exports.sociallogin = function(req, res) {
   var receivedValues = req.body;
    if(JSON.stringify(receivedValues) === '{}' || receivedValues=== undefined || receivedValues == null){
        res.json({"code" : 403, "status" : "Error","message" : "Not available !"});
        return;
    }
    else{
        register.findOne({'email':req.body.email}, function(err, user) {
            if(err){
                res.json({"code" : 403, "status" : "Success","message" : "Plz try again"});
            }else{
                if(user==null) {
                    var userdata = new register();
                    userdata.fullname=req.body.fullname;
                    userdata.email=req.body.email;
                    userdata.socialId=req.body.socialId;
                    userdata.provider=req.body.provider;
                    userdata.save(function (err,login) 
                    {
                        if(!err){
                            var authToken = jwt.sign(userdata, config.secret, {
                                expiresIn: 1440 * 60 * 30 // expires in 1440 minutes
                            });
                            console.log(authToken);
                            res.json({
                              "code": 200,
                              "authToken": authToken,
                              "userId":login._id,
                              "status":"success"
                            });    
                        }
                        else
                        {
                            res.json(false);
                        }
                    });
                } else {

                    var updateFB={
                        fullname:req.body.fullname,
                        email:req.body.email,
                        socialId:req.body.socialId,
                        provider:req.body.provider
                    };
                    console.log(updateFB);
                    var options = { new: true }; //so that user returned is the updated not original doc
                    register.findByIdAndUpdate(user._id, updateFB, options, function(err, fbupdate) {
                      if (err) {
                        res.status(400).json(err);
                      }else{
                        updateFB._id=user._id;
                        var authToken = jwt.sign(updateFB, config.secret, {
                            expiresIn: 1440 * 60 * 30 // expires in 1440 minutes
                        });
                        res.json({
                          "code": 200,
                          "authToken": authToken,
                          "userId":user._id,
                          "status":"success"
                        });  
                      }
                    });
                } 
            }
        });
    }
};

exports.myProfileUpdate = function(req, res) {
  var receivedValues = req.body;
  if (JSON.stringify(receivedValues) === '{}' || receivedValues === undefined || receivedValues === null) {
    console.log(chalk.red("### Error Message: Invalid Data Enter"));
    res.json({
      "code": 403,
      "status": "Error",
      "message": "Invalid Data Enter"
    });
    return;
  } else {
    var users = req.user;
    var fieldsToSet = {
      email           : req.body.email.toLowerCase(),
      firstName       : req.body.firstname,
      lastName        : req.body.lastName,
      phoneNumber     : req.body.phoneNumber,
      image           : req.body.img
    };
    //var userdata = new register();
    var options = { new: true }; //so that user returned is the updated not original doc
    register.findByIdAndUpdate(users._id, fieldsToSet, options, function(err, user) {
      if (!err) {
        console.log(chalk.green("### Update data Message:.....",user));
        res.json({
          "code": 200,
          "data": user
        });
      }else{
        console.log(chalk.red("### Error Message: User id not found....."));
        res.json({
          "code": 403,
          "status": "Error",
          "message": err
        });
      }
    });
  }
};
