import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaypalComponent } from './paypal/paypal.component';
import { PayumoneyComponent } from './payumoney/payumoney.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuestionComponent } from './question/question.component';

export const routes: Routes = [
  	{ path: '', redirectTo: 'question', pathMatch: 'full' },
  	{ path: 'login', component: LoginComponent },
  	{ path: 'question', component: QuestionComponent },
   	{
	    path: 'side-menu', component: SideMenuComponent, children: [
	      { path: '', redirectTo: 'home', pathMatch: 'full' },
	      { path: 'home', component: HomeComponent },
	      { path: 'myProfile', component: MyProfileComponent },
	      { path: 'change-pwd', component: ChangePwdComponent },
	      { path: 'payuMoney', component: PayumoneyComponent },
   		  { path: 'paypal', component: PaypalComponent },
   		  { path: 'paymentSucess/:txtnid', component: PaymentSuccessComponent }
	    ]
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
