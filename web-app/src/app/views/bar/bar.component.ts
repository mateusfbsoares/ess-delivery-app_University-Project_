import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {


  constructor(private route: Router) { }

  data: any;
  localStorage = new LocalStorageService();
  type: string;

  goToHome() {
    this.route.navigate(["/home"]);
  }

  goToProfile(user_id: string) {
    this.route.navigate(["user", user_id, "profile"]);
  }



  ngOnInit() {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
  }

}
