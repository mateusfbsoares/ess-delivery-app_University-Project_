import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {user} from '../classes/users'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  private currentURL: string;

  constructor(private http: Http) {
    this.currentURL = 'window.location.pathname'; // user/pay
  }

  private _metodo: user = new user();
  //     user/pay
  getuser(id:number): Promise<user> {
    return this.http.get(this.taURL + '/user/' + id)
             .toPromise()
             .then(res => res.json() as user[])
             .catch(this.catch);
  }
  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
