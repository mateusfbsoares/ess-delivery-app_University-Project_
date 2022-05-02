import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';
import { ErasepayService } from './erasepay.service';

@Component({
  selector: 'app-erasepay',
  templateUrl: './erasepay.component.html',
  styleUrls: ['./erasepay.component.css']
})
export class ErasepayComponent implements OnInit {

  clientId:string;
  
  user:user ;

  sizePayments:number;

  mainPay:Metodos_Pagamento;

  mainName:string;

  constructor(private router:Router, private aRouter:ActivatedRoute,private service: ErasepayService) {
   
  }

  findmain():void{

    for (var pagamento of this.user.metodos_de_pagamento.metodosPagamento){

      if(this.mainName == pagamento.name){
        this.mainPay = pagamento;
        localStorage.setItem("mainPay" , JSON.stringify(pagamento));
      }

    }

  }

  deletePay(): void {
    console.log(this.user.metodos_de_pagamento.metodosPagamento);
    if(this.user.metodos_de_pagamento.metodosPagamento.length < 2){
      alert("Adicione outro método antes de excluir este!");
      this.router.navigate(['/user/pay']);
      return;
    }

    //encontrar metodo que está no select
    this.findmain();

    this.service.delete(this.user.id,String(this.mainPay.ident)).then(res => {
      //mudar para padrao se necessario
      console.log(res)
      this.service.getuser(this.user.id).then(user => {
        localStorage.setItem("user" , JSON.stringify(user));
        //console.log(JSON.parse(localStorage.getItem("user")));
        this.router.navigate(['/user/pay']);
      })
    });
    
  }
  
  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
    this.mainName = this.mainPay.name;

  }


}
