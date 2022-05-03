import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private route: Router) { }

  goToHome() {
    this.route.navigate(["/home"]);
  }

  ngOnInit() {
  }

}
