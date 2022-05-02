import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';
import { user } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class ErasepayService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  private currentURL: string;

  constructor(private http: Http) {
  }

  //     user/pay
  delete(idUser:string, idMethod:string): Promise<Metodos_Pagamento[]> {
    
    return this.http.delete(this.taURL + "/user/" + idUser +"/metodos/" + idMethod)
      .toPromise()
      .then(res => {console.log("staus: " + res.status)
        if (res.status === 201) {return res.json() as Metodos_Pagamento[]} else {return null;}
      })
      .catch(this.catch);
  }
  getuser(id:string): Promise<user> {
    return this.http.get(this.taURL + "/users/" + id)
             .toPromise()
             .then(res => res.json() as user)
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }


}
