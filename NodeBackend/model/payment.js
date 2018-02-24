var mongoose  = require ('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = mongoose.Schema({

    txtnId: {
        type: String
    },
    amount: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    paymentDate:{
        type:String
    },
    status:{
        type:String
    }
});
module.exports = mongoose.model('payment', PaymentSchema, 'payment');
