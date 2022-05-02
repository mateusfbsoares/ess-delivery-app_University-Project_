import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './cars/cars.service';
import { ClientIdComponent } from './client-id/client-id.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { InsertcreditComponent } from './insertcredit/insertcredit.component';
import { InsertdebitComponent } from './insertdebit/insertdebit.component';
import { ClientIdService } from './client-id/client-id.service';
import { PaymentService } from './payment/payment.service';
import { InsertcreditService } from './insertcredit/insertcredit.service';
import { InsertdebitService } from './insertdebit/insertdebit.service';
import { PaypalComponent } from './paypal/paypal.component';
//import { PixComponent } from './pix/pix.component';
import { ErasepayComponent } from './erasepay/erasepay.component';
import { PaypalService } from './paypal/paypal.service';
import { PicpayService } from './picpay/picpay.service';
//import { PixService } from './pix/pix.service';
import { ErasepayService } from './erasepay/erasepay.service';
import { PicpayComponent } from './picpay/picpay.component';
import { BarComponent } from './views/bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    ClientIdComponent,
    HomeComponent,
    PaymentComponent,
    AddpaymentComponent,
    InsertcreditComponent,
    InsertdebitComponent,
    PaypalComponent,
    PicpayComponent,
    ErasepayComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'cars',
        component: CarsComponent
      },
      {
        path: 'user',
        component: ClientIdComponent
      },
      {
        path: 'user/pay',
        component: PaymentComponent
      },
      {
        path: 'addpayment',
        component: AddpaymentComponent
      },
      {
        path: 'addpayment/insertcredit',
        component: InsertcreditComponent
      },
      {
        path: 'addpayment/insertdebit',
        component: InsertdebitComponent
      },
      {
        path: 'addpayment/paypal',
        component: PaypalComponent
      },
      {
        path: 'addpayment/picpay',
        component: PicpayComponent
      },
      {
        path: 'erasepayment',
        component:ErasepayComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
  providers: [
    CarService,
    ClientIdService,
    PaymentService,
    InsertcreditService,
    InsertdebitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
