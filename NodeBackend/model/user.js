var mongoose  = require ('mongoose');
var Schema = mongoose.Schema;
var bcrypt  = require ('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lasttName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    provider:{
      type: String
    },
    socialId:{
      type: String
    },
    password: {
        type: String
    },
    image:{
        type: String
    },
    paymentType :{
        type:String
    },
    paymentHistory :[{ 
          txtnId:{type: String},
          amount:{type: String},
          email:{type:String},
          phoneNumber:{type:String},
          paymentDate:{type:String},
          status:{type:String},
          paymentType:{type:String}
    }]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema, 'user');
