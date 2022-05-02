import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Restaurant } from 'src/app/admin/restaurant';
import { Order } from '../orders/order';

@Injectable()
export class CurrentOrderService {

  private taURL = 'http://localhost:3000';
  private currentURL: string;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.currentURL = window.location.pathname;

  }
  
  getRestaurant(restName: string): Promise<Restaurant> {
    return this.http.get(this.taURL + "/restaurant/" + restName)
             .toPromise()
             .then(res => {
                // alert("entrei no GET -> " + res.json().name)
                return res.json() as Restaurant;
              })
             .catch(this.catch);
  }

  insertCoupon(couponName: string, order: Order, userid: string) {
    return this.http.post(this.currentURL + 'user/' + userid + '/order', JSON.stringify({'couponName': couponName, 'order': order}),  {headers: this.headers})
    .toPromise()
    .then(res => {
      if(res.status == 201) {
        return order;
      } else {
        return null;
      }
    })
    .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}