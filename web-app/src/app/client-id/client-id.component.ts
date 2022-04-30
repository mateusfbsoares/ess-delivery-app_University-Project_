import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientIdService } from './client-id.service';
@Component({
  selector: 'app-client-id',
  templateUrl: './client-id.component.html',
  styleUrls: ['./client-id.component.css']
})
export class ClientIdComponent implements OnInit {

  constructor(private router: Router,private service:ClientIdService) {}

  clientId:string; 

  goToComponentB(): void {
    this.service.getuser(this.clientId).then(user => this.router.navigate(['/user/pay'], {state: {user:user}}));
  }

  ngOnInit() {
    console.log("clientId");
  }

}
