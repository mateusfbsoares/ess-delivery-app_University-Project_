import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/user';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  id: string;
  localStorage = new LocalStorageService();
  
  profileSrc: string = "/assets/images/user-profile.png";

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
  }

  toOrders(){
    this.route.navigate(["user", this.user.id, "orders"]);
  }

  toPayment(){
    this.route.navigate(["user", this.user.id, "payment"]);
  }

  toCurrentOrder(){
    this.route.navigate(["user", this.user.id, "current-order"]);
  }


}
