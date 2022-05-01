import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from './paypal.service';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  
  constructor(private router: Router,private aRoute: ActivatedRoute,private service: PaypalService) {
   
  
  }

  user:user;
  ret:Metodos_Pagamento;
  metodo:Metodos_Pagamento = new Metodos_Pagamento();

  sendPost(): void {
    // fazer confirmaçao dps
    var confirmId = prompt("confirme seu Id");
    var confirme = prompt("para confirmar escreva: CONFIRMAR  ")

    this.service.create(this.user.id,this.metodo).then(res => {
      this.ret = res;
      console.log(this.ret);
      if(this.ret != null){
        console.log("deu bom 201");
        this.goToComponentB()
      }
      else{

        console.log("deu ruim 400")
      }
    });

  }

  goToComponentB(): void {
    this.service.getuser(this.user.id).then(user => this.router.navigate(['/user/pay'], {state: {user:user}}))
  
    console.log(this.user.name + " payment to addpay")
  }

  ngOnInit() {
    this.user = window.history.state.user;
    this.metodo.type = "Cartao de Credito" ;
   
  }

}
