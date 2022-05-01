import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {user} from '../classes/users'
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  clientId:string;
  
  user:user ;

  sizePayments:number;

  mainPay:string;

  newMainPay:string;


  constructor(private router:Router, private aRouter:ActivatedRoute,private service: PaymentService) {
   
  }

  goToComponentB(): void {
    this.router.navigate(['/addpayment']);
    console.log(this.user.name + " payment to addpay")
  }
  
  ngOnInit() {


    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("localstorage deu bom " + this.user.name);
    this.mainPay = this.user.metodos_de_pagamento.metodosPagamento[0].name;
    this.sizePayments = this.user.metodos_de_pagamento.metodosPagamento.length;
    console.log(this.user.metodos_de_pagamento.metodosPagamento)    

  }

}
