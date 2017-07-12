import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RegisterData} from "./register.model";
import {UserDataService} from "../../shared/services/user-data.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Component({
    selector: 'socnet-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private userService:UserDataService) {
    }

    errors = {
        count: 0,
        username: [],
        email: [],
        password: [],
        confirmPassword: [],
        firstName: [],
        lastName: [],
        university: []
    };

    submit(form: RegisterData) {
        let data: RegisterData = new RegisterData(form.username,form.email,form.password,form.confirmPassword,form.firstName,form.lastName,form.university);
        this.errors = data.checkForValidationErrors();
        if (this.errors.count == 0) {
            this.userService.registerUser(data).map(x=> x.json()).subscribe(res=>{
                if (res.success == true){
                    this.userService.logIn(data.username,data.password);
                }
            },err=>{
                console.log("register error");
                console.log(err);
            });
        }
    }

    ngOnInit() {
    }

}
