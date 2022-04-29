import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-id',
  templateUrl: './client-id.component.html',
  styleUrls: ['./client-id.component.css']
})
export class ClientIdComponent implements OnInit {

  constructor(private router: Router) {}

  clientId:number; 

  

  goToComponentB(): void {

    
    this.router.navigate(['/user/pay'], {state: {data: {id:this.clientId}}});
  }

  ngOnInit() {
    console.log("dale dale");
  }

}
