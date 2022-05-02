import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Coupon } from '../admin/coupon';
import { LocalStorageService } from '../local-storage.service';

const ADMIN = "/admin";
const RESTAURANT = "/promotion/restaurant";

@Injectable()
export class PromotionService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  private _currentURL: string;

  data: any;  
  public type: string;
  public coupon: Coupon;
  
  localStorage = new LocalStorageService();
  
  public get currentURL(): string {
    return this._currentURL;
  }

  public set currentURL(value: string) {
    this._currentURL = value;
  }

  constructor(private http: Http) {
    this.init();
  }

  init(){
    var path = window.location.pathname;
    this.type = this.localStorage.get('type');
    this.currentURL = path.replace("/add", "");
    this.currentURL = this.currentURL.replace("-coupon", "");
    this.currentURL = this.currentURL.replace("rest", "restaurants");
    // alert(this.currentURL);
  }

  setAttributes(coupon){
    //console.log('a', this.currentURL);
    if(this.currentURL == ADMIN){
      coupon.adm = true;
      coupon.product = "Nenhum";
      this.currentURL = "/promotion" + this.currentURL;
    }else{
      coupon.adm = false;
    }
  }

  createCoupon(coupon: Coupon): Promise<Coupon> { 
    this.init();
    this.setAttributes(coupon);
    // alert("criando cupom -> " + this.currentURL);
    return this.http.post(this.taURL + this.currentURL, JSON.stringify(coupon), { headers: this.headers })
      .toPromise()
      .then(res => {
        if (res.status === 201) {
          alert("Cupom cadastrado com sucesso");
          return res.json() as Coupon;
        } else {
          alert("Cupom não pode ser adicionado");
          return null;
        }
      })
      .catch(this.catch);
  }

  // editCoupon(couponName: string, coupon: Coupon): Promise<Coupon[]> {
  
  //   return this.http.put(this.taURL + this.currentURL + "/" + couponName, JSON.stringify(coupon))
  //            .toPromise()
  //            .then(res => res.json() as Coupon[])
  //            .catch(this.catch);
  // }

  getCoupons(): Promise<Coupon[]> {
    this.init();
    // alert("entrou no get");

    return this.http.get(this.taURL + this.currentURL)
             .toPromise()
             .then(res => res.json() as Coupon[])
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any> {
    // alert("Cupom não pode ser adicionado");
    // console.error('Oops, something went wrong', erro);
    return Promise.reject(erro.message || erro);
  }
}