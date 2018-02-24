import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/utils.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
	user: any = {};
	errorMsg:any;
  	constructor(private route: ActivatedRoute, 
  				private router: Router,
  				public UtilsService: UserService,
  				public snackBar: MatSnackBar) { }

	ngOnInit() {
	}
  	changepwd(){
  		console.log(this.user);
  		if(this.user.newpassword == this.user.confirmpassword){
		  	this.UtilsService.makeAPICall(this.UtilsService.postMethod, this.UtilsService.changePassword
		      , this.user, (response) => {
		        console.log("change pwd..............",response);
		        if(response.code == 200 && response.status == 'Success'){
		        	this.errorMsg=response.message;
		        }else{
		        	this.errorMsg=response.message;
		        	this.snackBar.openFromComponent(ChangePwdComponent, {
				      duration: 2000,
				    });
		        	console.log("sorry has been not change ! try again",response.message);
		        }
		    });
		}else{
			// this.snackBar.openFromComponent(ChangePwdComponent, {
		 //      duration: 2000,
		 //    });
			this.errorMsg='Confirm Password Not match !!';
		    this.snackBar.open(this.errorMsg);
		}
  	}

}
