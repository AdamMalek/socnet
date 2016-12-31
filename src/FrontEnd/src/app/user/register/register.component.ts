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
        let data = new RegisterData(form.username,form.email,form.password,form.confirmPassword,form.firstName,form.lastName,form.university);
        this.errors = data.checkForValidationErrors();
        if (this.errors.count == 0) {
            this.userService.registerUser(data).catch(res=> {
                res = res as Response;
                if (res.status = 400){
                    console.log(res.json());
                }
                return Observable.throw(res);
            }).map(x=> x.json()).subscribe(res=>{
                if (res.status == "ok"){
                    this.userService.logIn(data.username,data.password);
                }
            })
        }
    }

    ngOnInit() {
    }

}
