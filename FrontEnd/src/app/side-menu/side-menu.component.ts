import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  logout(){
  	localStorage.clear();
  	this.router.navigate(['/login']);
  }

}
