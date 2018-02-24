import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserService } from './service/utils.service';

import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { Component} from '@angular/core';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaypalComponent } from './paypal/paypal.component';
import { PayumoneyComponent } from './payumoney/payumoney.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuestionComponent } from './question/question.component';

import {handleUndo, configureBufferSize} from 'ngrx-undo';
configureBufferSize(150);
let providers = {
    "google": {
      "clientId": "GOOGLE_CLIENT_ID"
    },
    "linkedin": {
      "clientId": "LINKEDIN_CLIENT_ID"
    },
    "facebook": {
      "clientId": "my facebbok ID",
      "apiVersion": "v2.4" //like v2.4 
    }
};


@NgModule({
  declarations: [
    AppComponent,
    PaypalComponent,
    PayumoneyComponent,
    PaymentSuccessComponent,
    LoginComponent,
    HomeComponent,
    SideMenuComponent,
    HeaderComponent,
    ChangePwdComponent,
    MyProfileComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,routing,
    Angular2SocialLoginModule,
    HttpModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,MatSidenavModule,MatTabsModule,MatDialogModule,
    MatCardModule,MatSnackBarModule,
    MatInputModule,MatIconModule,MatButtonModule,MatGridListModule,MatRadioModule,DragulaModule,
    MatMenuModule,MatCheckboxModule,MatSelectModule,MatToolbarModule,MatSlideToggleModule,MatDatepickerModule,MatNativeDateModule,
    // StoreModule.provideStore(rootReducer, {metaReducers: [handleUndo]}) 

  ],
  providers: [HttpModule,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);