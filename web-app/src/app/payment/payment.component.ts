import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
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

  mainPay:Metodos_Pagamento;

  mainName:string;

  constructor(private router:Router, private aRouter:ActivatedRoute,private service: PaymentService) {
   
  }

  findmain():void{

    for (var pagamento of this.user.metodos_de_pagamento.metodosPagamento){

      if(this.mainName == pagamento.name){
        this.mainPay = pagamento;
        localStorage.setItem("mainPay" , JSON.stringify(pagamento));
      }

    }

  }

  goToComponentB(): void {

    this.findmain();
    
    this.router.navigate(['/addpayment']);
    console.log(this.user.name + " payment to addpay")
  }
  
  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
  
    if(this.mainPay == null){
      this.mainPay = this.user.metodos_de_pagamento.metodosPagamento[0];
      localStorage.setItem("mainPay" , JSON.stringify(this.mainPay));
    }
    
    this.mainName = this.mainPay.name;

    console.log(this.mainName);
    console.log("localstorage deu bom " + this.user.name);
   

  }

}
