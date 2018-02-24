import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
	  txtid: any;
  	private sub: any;
  	constructor(private http: Http,private activatedRoute: ActivatedRoute) { 

  	}

  	ngOnInit() {
      // login user 
      var loginuser ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7ImNvbnRhY3RJbmZvIjp7fSwicGVyc29uYWxEZXRhaWxzIjp7fSwieW91ckVtZXJnZW5jeSI6e30sIm90aGVyRW1lcmdlbmN5Ijp7fSwiZ2VuZXJhbFByYWN0aXRpb25lciI6e30sImRvY3VtZW50cyI6eyJwYXNzcG9ydENvcHkiOm51bGwsImluY29tZVRheCI6bnVsbCwicGFzc2Jvb2siOm51bGwsImlkQ2FyZCI6bnVsbCwidG91clBsYW4iOm51bGwsImhvdGVsQm9va2luZyI6bnVsbCwiYWlyVGlja2V0IjpudWxsLCJlbXBvbHllZSI6e30sInNlbGZFbXBvbHllZSI6e319LCJzcG9uc2VyIjp7fX0sIndhc1BvcHVsYXRlZCI6ZmFsc2UsInNjb3BlIjp7Il9fdiI6MCwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHRVWWZEU1VwNUNXeFpvaTZmMXgxaC51WjVCeGl0blVLbE5WZ2NGQ0ZOSUk0S00uSHNzbFcuIiwiX2lkIjoiNWExZmQ2MjVjMTVlZDQwNzJlOTk0YWE3IiwiZG9jdW1lbnRzIjp7ImFpclRpY2tldCI6bnVsbCwiaG90ZWxCb29raW5nIjpudWxsLCJ0b3VyUGxhbiI6bnVsbCwiaWRDYXJkIjpudWxsLCJwYXNzYm9vayI6bnVsbCwiaW5jb21lVGF4IjpudWxsLCJwYXNzcG9ydENvcHkiOm51bGx9LCJwYXltZW50SGlzdG9yeSI6W119LCJhY3RpdmVQYXRocyI6eyJwYXRocyI6e30sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6e30sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjoyLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJwYXltZW50SGlzdG9yeSI6W10sImNvbnRhY3RJbmZvIjp7fSwicGVyc29uYWxEZXRhaWxzIjp7fSwieW91ckVtZXJnZW5jeSI6e30sIm90aGVyRW1lcmdlbmN5Ijp7fSwiZ2VuZXJhbFByYWN0aXRpb25lciI6e30sImRvY3VtZW50cyI6eyJwYXNzcG9ydENvcHkiOm51bGwsImluY29tZVRheCI6bnVsbCwicGFzc2Jvb2siOm51bGwsImlkQ2FyZCI6bnVsbCwidG91clBsYW4iOm51bGwsImhvdGVsQm9va2luZyI6bnVsbCwiYWlyVGlja2V0IjpudWxsLCJlbXBvbHllZSI6e30sInNlbGZFbXBvbHllZSI6e319LCJzcG9uc2VyIjp7fSwiX2lkIjoiNWExZmQ2MjVjMTVlZDQwNzJlOTk0YWE3IiwicGFzc3dvcmQiOiIkMmEkMDgkdFVZZkRTVXA1Q1d4Wm9pNmYxeDFoLnVaNUJ4aXRuVUtsTlZnY0ZDRk5JSTRLTS5Ic3NsVy4iLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiX192IjowfSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF0sIiRfX29yaWdpbmFsX3JlbW92ZSI6W251bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNTEyMDM1ODc3LCJleHAiOjE1MTQ2Mjc4Nzd9.9B4MB3epPXejTkwWyhpuBi_-tAZFhosTY2VH99lVCX8"
      var url = 'http://localhost:3000/api/paymentapproved';
  		// this.sub = this.activatedRoute.params.subscribe(
    //     (param: any) => {
    //       this.txtid = param['txtnid'];
    //       console.log("this.txtid ...................",this.txtid );

    //       // loginuser token value set as localstorage token data 
    //       let headerdata = new Headers({ 'Content-Type': 'application/json', 'token': loginuser });
    //       let options = new RequestOptions({ headers: headerdata });

    //       var data ={
    //         txtnId : this.txtid
    //       }
    //       this.http.post(url, data,options).map((res:any) => res).subscribe(
    //         (success) => {
    //           let resData = JSON.parse(success._body).data;
    //             console.log("sucess.................",JSON.parse(success._body).data);
    //             if (success.status == 200 && resData == 'failure') {
    //                 //call failure payment to route call
    //             }else if(success.status == 200 && resData == 'sucess'){
    //               //call sucess payment to route call
    //             }else{
    //               //call cancel payment to route call
    //             }
    //         },
    //         (error) => alert(error)
    //       );

    //     }
    //   )
  	}

}
