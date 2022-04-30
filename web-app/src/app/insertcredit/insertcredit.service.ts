import { Injectable } from '@angular/core';
import { Http,Headers  } from '@angular/http';
import { Metodos_Pagamento } from '../classes/metodos_pagamento';

@Injectable({
  providedIn: 'root'
})
export class InsertcreditService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  private currentURL: string;

  constructor(private http: Http) {
  }

  //     user/pay
  create(id:string,metodo: Metodos_Pagamento): Promise<Metodos_Pagamento> {
    
    return this.http.post(this.taURL + "/user/" + id +"/metodos",JSON.stringify(metodo), {headers: this.headers})
      .toPromise()
      .then(res => {console.log("staus: " + res.status)
        if (res.status === 201) {return metodo;} else {return null;}
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
