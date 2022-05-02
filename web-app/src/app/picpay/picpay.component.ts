import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';
import { PicpayService } from './picpay.service';

@Component({
  selector: 'app-picpay',
  templateUrl: './picpay.component.html',
  styleUrls: ['./picpay.component.css']
})
export class PicpayComponent implements OnInit {

  constructor(private router: Router,private aRoute: ActivatedRoute,private service: PicpayService) {
   
  
  }

  countcheck:number = 0;
  checou:string = "deschecado";
  user:user;
  metodo:Metodos_Pagamento = new Metodos_Pagamento();

  checar():void{
    if(this.countcheck%2 == 0){
      this.checou = "checado";
      console.log(this.checou);
    }
    else{
      this.checou = "deschecado";
      console.log(this.checou);
    }
    this.countcheck = this.countcheck + 1;
  }

  backPage(){
    this.router.navigate(['/addpayment']);
  }

  checkfields():boolean{
    
    var corrections = "";

    console.log(typeof this.metodo.number)
    

    if( this.user.name == undefined ){
      corrections = corrections + "* Nome do titular não pode ficar vazio\n"
    }
    if( this.metodo.email == undefined ){
      corrections = corrections + "* E-mail não pode ficar vazio\n"
    }

    if(corrections != ""){
      
      alert(corrections);
      return false;
    }

    return true;
  }

  sendPost(): void {

    //checa se os campos preenchidos estão ok
    if(!this.checkfields())return;

    //colocando os 4 últimos digitos no nome

    this.metodo.name =  "PicPay(" + this.metodo.email + ")";
    // fazer confirmaçao dps
    var confirmId = prompt("confirme seu Id");
    var confirme = prompt("para confirmar escreva: CONFIRMAR ");
    
    while(confirmId != this.user.id){
      alert("id inválido");
      confirmId = prompt("confirme seu Id");
    }
    while(confirme != "CONFIRMAR"){
      alert("digite corretamente a palavra CONFIRMAR");
      confirme = prompt("para confirmar escreva: CONFIRMAR ");
    }

    this.service.create(this.user.id,this.metodo).then(res => {

      //mudar para padrao se necessario
      if(this.checou == "checado"){
        localStorage.setItem("mainPay" , JSON.stringify(res));
      }
     
      if(res != null){
        console.log("deu bom 201");
        this.goToComponentB();
      }

      else{
        console.log("deu ruim 400");
      }

    });

  }

  goToComponentB(): void {
    this.service.getuser(this.user.id).then(user => {
      localStorage.setItem("user" , JSON.stringify(user));
      //console.log(JSON.parse(localStorage.getItem("user")));
      this.router.navigate(['/user/pay']);
    })
  
    console.log(this.user.name + " payment to addpay")
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user.metodos_de_pagamento.metodosPagamento.length == 5){
      alert("Número máximo de métodos de pagamento atingido, remova um para adicionar outro");
      this.router.navigate(['/user/pay']);
    }
    this.metodo.type = "PicPay" ;
    console.log(this.metodo);
    this.metodo.ident = 0;
   
  }


}
