import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, User } from '../admin/user';
import { LocalStorageService } from '../local-storage.service';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }

  infoGetter: string;

  user: User = {
    name: null,    //string
    id: null,     //string;
    email: null,    //string;
    orders: null   //Order[];
  };

  order: Order = {
    id: null,          //string;
    products: null,    //Product[];
    amount: null,      //number;
    coupon: null,      //Coupon;
    restaurant: null,  //string;
  }

  localStorage = new LocalStorageService();

  async sendEmail() {
    // get user id and order id from localstorage
    this.user.id = this.localStorage.get('user_id');
    this.order.id = this.localStorage.get('order_id')

    const info = await this.emailService.sendEmail(this.user, this.order);
    this.infoGetter = info
    console.log("response from emailService: " + info);
  }

  ngOnInit(): void {

    // DEBUG
    // console.log("######################")
    // console.log("user id: " + this.user.id)
    // console.log("order id: " + this.order.id)
    // console.log("#####################")

    this.sendEmail()
  }
}
