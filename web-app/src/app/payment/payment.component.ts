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

  constructor(private router:Router, private aRouter:ActivatedRoute) {}

  clientId:number;

  paymentService:PaymentService;

  user1:user;
  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
  ngOnInit() {

    this.clientId = window.history.state.data.id;
    console.log(`deu bom ${this.clientId}`);
    
    this.paymentService.getuser(this.clientId).then(res => this.user1 = res)
    .catch(this.catch);
     
    console.log(this.user1.name)
  }

}
