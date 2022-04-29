import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

import { Coupon } from 'src/app/admin/coupon';
import { AdminService } from 'src/app/admin/admin.service';
// import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { PromotionService } from 'src/app/promotion/promotion.service';
import { Restaurant } from 'src/app/admin/restaurant';
import { Admin } from 'src/app/admin/admin';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nome', 'Produto', 'Desconto', 'Valor Mínimo', 'Status', 'Editar' ,'Deletar'];
  restaurant: Restaurant;
  admin: Admin;
  coupons: Coupon[];
  type: string;

  @ViewChild(MatTable) table: MatTable<Coupon>;

  constructor(private service: AdminService, private editService: PromotionService, private acRoute: ActivatedRoute) {}

  ngOnInit() {
    this.acRoute.params.subscribe((params: Params) => this.type = params['type']);
    if(this.type == "admin"){
      this.admin = window.history.state.data;
      this.coupons = window.history.state.coupons;
    }else{
      this.restaurant = window.history.state.data;
      this.coupons = this.restaurant.coupons;
    }
  }


  removeData(couponName: string) {

    var index = this.coupons.findIndex(c => c.name == couponName);
    var couponCopy = this.coupons[index];

    this.coupons.splice(index, 1)
    this.table.renderRows();

    this.service.removeCoupon(couponName)
          .catch(erro => {
            alert(erro);
            this.coupons.push(couponCopy);
            this.table.renderRows();
          });
  }

  sendData(coupon: Coupon){
    this.editService.coupon = coupon;
  }
  
}