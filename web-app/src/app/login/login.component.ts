import { Component, OnInit } from '@angular/core';
import { query } from '@angular/animations';
import { NgModule } from '@angular/core';
import { Params, Router } from '@angular/router';
import { LoginService } from './login.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Coupon } from '../admin/coupon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private service: LoginService) {}
  type: string;

  localStorage = new LocalStorageService();

  ngOnInit(): void {
    this.type = this.localStorage.get('type');
  }
  
  checkType(id: string): void {
    if(this.type=="admin"){
      this.service.getAdmin("admin/" + id)
      .then(async admin => {
        this.localStorage.set('admin', admin);
        
        var coupons = await this.service.getAdminCoupons('promotion/admin');

        this.localStorage.set('coupons', coupons);
        this.route.navigate(["promotion/" + this.type]);        
      })
    }
    else if(this.type=="user"){
      this.service.getUser("users/" + id)
        .then(user => {
          this.localStorage.set('user', user);
          this.route.navigate(["user/" + id + "/profile"]);
        })
    }
    else{
      this.service.getRestaurant("restaurant/" + id)
        .then(rest => {
          this.localStorage.set('rest', rest);
          this.localStorage.set('coupons', rest.coupons);
          this.route.navigate(["promotion/", this.type, id ]);
        })
    }
  }
}