import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../shared/services/user-data.service";

@Component({
  selector: 'socnet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserDataService) { }

  submit(form){
      if (form.username != null && form.username != "" && form.password != null && form.password != ""){
          this.userService.logIn(form.username,form.password);
      }
  }

  ngOnInit() {
  }

}
