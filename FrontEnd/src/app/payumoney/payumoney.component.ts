import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

@Component({
  selector: 'app-payumoney',
  templateUrl: './payumoney.component.html',
  styleUrls: ['./payumoney.component.css']
})
export class PayumoneyComponent implements OnInit {
	
  	constructor(private http: Http) { }
  	
  	ngOnInit() {
      
    }
}

