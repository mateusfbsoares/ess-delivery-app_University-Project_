import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../classes/users';

@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.css']
})
export class AddpaymentComponent implements OnInit {


  user:user;
  constructor(private router:Router, private aRouter:ActivatedRoute) { }

  goToComponentB(): void {
    this.router.navigate(['/addpayment/insertcredit']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));;
    console.log("no addpay " + this.user.name);
  }

}
