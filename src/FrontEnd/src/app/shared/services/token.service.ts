import { Injectable } from '@angular/core';

declare var token;

@Injectable()
export class TokenService {

  constructor() { }

  getToken(){
      return token;
      //return localStorage.getItem("access_token");
  }

}
