import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UserService } from '../service/utils.service';
import { AuthService } from "angular2-social-login";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any={};
  errors;
	sub: any;
  accessdata:any={};

  @ViewChild('logiref',{read : ElementRef}) logiref:ElementRef
  constructor(private route: ActivatedRoute, 
              private router: Router, 
              public userService: UserService,
              public _auth: AuthService) {

  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/side-menu']);
    }
  }
  logiuser(){
    console.log("login detail");
    this.userService.makeAPICall(this.userService.postMethod, this.userService.loginAPI, this.user, (response) => {
      if (response != 0) {
        console.log("sucess register data.......",response);
        if(response.status == "success" ){
          console.log("login sucessfully");
          localStorage.setItem("token", response.authToken);
          localStorage.setItem("userId", response.userId);
          this.router.navigate(['/side-menu']);
        }else{
          console.log(response.message);
        }
      }
      else {
        this.errors = "Please Fill All Field Proper!";
      }
    });
  }
  register(){
    this.userService.makeAPICall(this.userService.postMethod, this.userService.signupAPI, this.user, (response) => {
      if (response != 0) {
        console.log("sucess register data.......",response);
        if(response.status == "success" ){
          console.log("login sucessfully");
          localStorage.setItem("token", response.authToken);
          localStorage.setItem("userId", response.userId);
          this.router.navigate(['/side-menu']);
        }else{
          console.log(response.message);
        }
      }
      else {
        this.errors = "Please Fill All Field Proper!";
      }
    });
  }
  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log("acces data............");
        console.log(data);
        this.user =data;
        this.accessdata ={
          email:this.user.email,
          fullname:this.user.name,
          socialId:this.user.uid,
          provider:this.user.provider
        };
        console.log("acces data............",this.accessdata);
        if(this.user.email){
          this.userService.makeAPICall(this.userService.postMethod, this.userService.socialLoginAPI, this.accessdata, (response) => {
          if (response != 0) {
            if(response.status == "success" ){
              console.log("login sucessfully");
              localStorage.setItem("token", response.authToken);
              localStorage.setItem("userId", response.userId);
            }else{
              console.log("error Login data.......",response);
              console.log(response.message);
            }
          }
          else {
            console.log("Login fail.......",response);
          }
        });
        }else{
          console.log("plz facebook email permission");
        }
        
      }
    )
  }


  abc;
  copyRef(){
    let copyHtml = this.logiref.navtiveElement.innerHTML;

    this.abc = this.abc +copyHtml;
  }
}
