import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
declare var $:any;

@Injectable()
export class UserService {

 URL = "http://localhost:3000/";
  url = "";

  postMethod = "POST";
  getMethod = "GET";
  headerdata:any;
  error = "";

  signupAPI = "userRegister";
  loginAPI = "userLogin";
  socialLoginAPI="socialLogin";
  loginProfileAPI="api/myprofile";
  changePassword="api/changepassword";
  updateMyProfile="api/updateMyProfile";

  stripePaymentAPI="api/stripePayment";
  constructor(public Http: Http) { }

      makeAPICall(methodName, url, params, callback: (response) => void) {

        if(localStorage.getItem('token')){
            this.headerdata = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        }else{
            this.headerdata = new Headers({ 'Content-Type': 'application/json' });
        }

        this.url = this.URL + url;
        //let headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
        let options = new RequestOptions({ headers: this.headerdata });
        
        
        /* API call using Post Method.*/
        if (methodName == this.postMethod) {
            return this.Http.post(this.url, params, options).map(res => res.json()).subscribe(
                response => {
                    callback(response);
                },
                error => {
                    this.error = error;
                }
            )
        }

        /* API call using Get Method.*/
        if (methodName == this.getMethod) {
            // return this.http.get(this.endpoint_url).map(res => res.json());
            return this.Http.get(this.url, options).map(res => res.json()).subscribe(
                response => {
                    callback(response);
                },
                error => {
                    this.error = error;
                }
            )
        }
        /** end get method  */
      }
}
