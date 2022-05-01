import { Component, OnInit } from '@angular/core';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { InsertdebitService } from './insertdebit.service';

@Component({
  selector: 'app-insertdebit',
  templateUrl: './insertdebit.component.html',
  styleUrls: ['./insertdebit.component.css']
})
export class InsertdebitComponent implements OnInit {

  constructor(private router: Router,private aRoute: ActivatedRoute,private service: InsertdebitService) {
   
  
  }

  user:user;
  ret:Metodos_Pagamento;
  metodo:Metodos_Pagamento = new Metodos_Pagamento();

  sendPost(): void {
    var teste;
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
