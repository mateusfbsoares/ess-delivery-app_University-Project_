import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';
import { InsertcreditService } from './insertcredit.service';

@Component({
  selector: 'app-insertcredit',
  templateUrl: './insertcredit.component.html',
  styleUrls: ['./insertcredit.component.css']
})
export class InsertcreditComponent implements OnInit {

  constructor(private router: Router,private aRoute: ActivatedRoute,private service:InsertcreditService) {
   
  
  }

  countcheck:number = 0;
  checou:string;
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

  checkfields():boolean{
    
    var corrections = "";

  
    if( this.metodo.number.length != 16 ){
      corrections = corrections + "* Digite exatamente 16 digitos\n"
    }
    if( this.metodo.number.length != 3 ){
      corrections = corrections + "* Digite exatamente 3 digitos\n"
    }

    if( this.metodo.name_titular.length == 0 ){
      corrections = corrections + "* Nome do titular não pode ficar vazio\n"
    }
    if( this.metodo.flag != "visa" && this.metodo.flag != "master"  ){
      corrections = corrections + "* Selecione visa ou master\n"
    }
    if( this.metodo.number.length != 3 ){
      corrections = corrections + "* Digite exatamente 3 digitos\n"
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
      if(this.checou = "checado"){
        localStorage.setItem("mainPayment" , JSON.stringify(res));
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
    this.metodo.type = "Cartao de Credito" ;
   
  }

}
