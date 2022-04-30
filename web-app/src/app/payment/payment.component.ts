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

  constructor(private router:Router, private aRouter:ActivatedRoute,private service: PaymentService) {
   
  }

  goToComponentB(): void {
    this.service.getuser().then(user => this.router.navigate(['/addpayment'], {state: {user:user}}));
    console.log(this.user)
  }
  
  ngOnInit() {

    this.user = window.history.state['user']
    console.log("peguei esta merda " + window.history.state.user)

  }

}
