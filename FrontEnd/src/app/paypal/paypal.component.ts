import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/utils.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
    /*-------------------Payumoney payment----------------------------------*/
        message = 'Everyone come and see how good I look!';
        mkey = 'abc2543ddfdtt'; 
        productInfo = 'Verification Payment';
        txnid = this.makeid();
        amount = 2.99;
        id = '1234567';
        email = 'test@test.com';
        phone = 9712847879;
        lastName = 'PATEL';
        firstName = 'HR';
        surl = "http://localhost:3000/PaymentStatus";
        hash = '';
    /*-------------------Payumoney payment----------------------------------*/
    errors;
    constructor(public userService: UserService,private http: Http) { 
        if(!localStorage.getItem('token')){
          this.router.navigate(['/login']);
        }
    }

  	ngOnInit() {
        paypal.Button.render({

            env: 'sandbox', // sandbox | production
            style: {
	            label: 'paypal',
	            size:  'medium',    // small | medium | large | responsive
	            shape: 'rect',     // pill | rect
	            color: 'blue',     // gold | blue | silver | black
	            tagline: false    
	        },
	        funding: {
            	allowed: [ paypal.FUNDING.CREDIT ]
       		 },

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox:    'paypal test key',
                production: '<insert production client id>'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function(data, actions) {

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: this.paymentAmount, currency: 'USD' }
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {
            	console.log("paypal data..............",data);
                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function(sucesss,error) {
                	if(sucesss){
                		alert('Payment Complete!');
                        console.log(sucesss);
                	}else{
                		alert('Payment fail!');
                        console.log(error);
                	}
                });
            }
        },'#paypal-button');
        
        /*----------------- payuMoney ------------------------*/
            var data = { preHashString: this.mkey + '|' + this.txnid + '|' + this.amount + '|' + this.productInfo + '|' + this.firstName + '|' + this.email + '|' + this.id + '||||||||||' };
            console.log(data);
            var url = 'http://localhost:3000/createHash';
            this.http.post(url, data).map((res:any) => res).subscribe(
                (success) => {
                    if (success.status == 200) {
                       // this.hash = JSON.parse(success._body).hash;
                       this.hash = JSON.parse(success._body).b64;
                       console.log("hash...............",JSON.parse(success._body).b64);
                        // document.getElementById('paymentForm').submit();
                        var decodedData1 = window.atob(JSON.parse(success._body).b64);
                        console.log("decodedData...............",decodedData1); 
                    }
                },
                (error) => alert(error)
            );
    }
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    selectedPaln(amount){
        this.amount=amount;
        console.log(this.amount);
    }
    payuMoneyPayment() {
        if (this.hash) {
            document.getElementById('paymentForm').submit();
        }
    }
    /*----------------- Stripe Integration -------------------------*/
        stripetToken(){
          this.stripetCreateToken().then(success => {
            console.log("sucess...............",success);
            var token ={
                tokenID:'success'
            }
            this.userService.makeAPICall(this.userService.postMethod, this.userService.stripePaymentAPI, token, (response) => {
                if (response) {
                   console.log("stripe payment.................",response);
                }else {
                    this.errors = "Please Fill All credit card Details!";
                }
            });
          }, (error) => {
                console.log("error....................",error);
          });
        }
        stripetCreateToken(): Promise<any>{
            return new Promise(function(resolve,reject){
                var handler = (<any>window).StripeCheckout.configure({
                    key: 'my test key',
                    locale: 'auto',
                    name: 'HR Payment',
                    token: function (token: any,callback) {
                        let tokenID =token.id;
                        resolve(tokenID);
                    }
                });
                handler.open({
                  name: 'HR Payment',
                  description: '2 widgets',
                  amount: 2000,
                  email:'abc@gmail.com'
                });
            });
        }
    /*-----------------End Stripe Integration -------------------------*/
    /*----------------- PayTM Integration ----------------------------*/
}
