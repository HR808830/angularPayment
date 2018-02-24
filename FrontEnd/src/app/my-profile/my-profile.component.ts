import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/utils.service';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
	myprofile:any={};
	/*---------------- paytm ----------------------*/
		PAYTM_STAG_URL = 'https://pguat.paytm.com';
		PAYTM_PROD_URL = 'https://secure.paytm.in';
		MID = 'WorldP64425807474247';
		PAYTM_ENVIORMENT = 'TEST';   // PROD FOR PRODUCTION
		PAYTM_MERCHANT_KEY = 'kbzk1DSbJiV_O3p5';
		WEBSITE = 'worldpressplg';
		CHANNEL_ID =  'WEB';
		INDUSTRY_TYPE_ID = 'Retail';
		PAYTM_FINAL_URL = '';

	/*---------------- end paytem ------------------*/
  	constructor(public UtilsService: UserService) { 
  		this.UtilsService.makeAPICall(this.UtilsService.getMethod, this.UtilsService.loginProfileAPI,null
		    , (response) => {
		        console.log("change pwd..............",response);
		        if(response.code == 200 && response.status == 'Success'){
		        	this.myprofile=response.data;
		        	console.log(this.myprofile);
		        }else{
		        	console.log("sorry has been not change ! try again",response.message);
		        }
		});
  	}

	ngOnInit() {
	  	if (this.PAYTM_ENVIORMENT== 'TEST') {
		 	this.PAYTM_FINAL_URL = this.PAYTM_STAG_URL + '/oltp-web/processTransaction'
		}else
		{
		  	this.PAYTM_FINAL_URL = this.PAYTM_PROD_URL + '/oltp-web/processTransaction'
		}
	}

	updateProfile(){
		this.UtilsService.makeAPICall(this.UtilsService.postMethod, this.UtilsService.updateMyProfile,this.myprofile
		    , (response) => {
		        console.log("change pwd..............",response);
		        if(response.code == 200 && response.status == 'Success'){
		        	this.myprofile=response.data;
		        	console.log(this.myprofile);
		        }else{
		        	console.log("sorry has been not change ! try again",response.message);
		        }
		});
	}

}
