import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';
import { EditpayService } from './editpay.service';

@Component({
  selector: 'app-editpay',
  templateUrl: './editpay.component.html',
  styleUrls: ['./editpay.component.css']
})
export class EditpayComponent implements OnInit {

  clientId:string;
  
  user:user ;

  sizePayments:number;

  metodo:Metodos_Pagamento = new Metodos_Pagamento;

  mainPay:Metodos_Pagamento;

  mainName:string;

  constructor(private router:Router,private service: EditpayService ) {
   
  }

  findmain():void{

    for (var pagamento of this.user.metodos_de_pagamento.metodosPagamento){

      if(this.mainName == pagamento.name){
        this.mainPay = pagamento;
        localStorage.setItem("mainPay" , JSON.stringify(pagamento));
      }

    }

  }

  onChange(novome:string):void{
    console.log("mudoou");
    this.findmain();
    console.log(novome);
  }


  
  editPay(): void {

    var confirmId = prompt("confirme seu Id");
    
    
    if(confirmId != this.user.id){
      return;
    }
    var confirme = prompt("para confirmar escreva: CONFIRMAR ");
    if(confirme != "CONFIRMAR"){
      return;
    }
 
    //encontrar metodo que está no select
    console.log(this.mainPay);
    this.findmain();

    this.mainPay.email = this.metodo.email;
    this.mainPay.name = this.mainPay.type + "(" + this.mainPay.email + ")"
    console.log("antes put");
    console.log(this.mainPay);
    
    this.service.edit(this.user.id,this.mainPay).then(res => {
   
      if(res){
        this.service.getuser(this.user.id).then(user => {
          localStorage.setItem("user" , JSON.stringify(user));
          localStorage.removeItem("mainPay");
          this.router.navigate(['/user/pay']);
        })
      }
      else{
        alert("confira se inseriu os dados corretamente")
      }
    
      
    });
    
  }


  backPage(){
    this.router.navigate(['/user/pay']);
  }
  
  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
    this.mainName = this.mainPay.name;

    console.log(this.mainPay.name);

  }

}
