import {Injectable} from '@angular/core';
import {IAlertify} from "../models/alertify.interface";

declare var alertify;

@Injectable()
export class NotificationService {

    _notificationService:IAlertify = alertify;

    constructor() {
    }

    showInformation(message:string, fullscreen:boolean=false){
        this._notificationService.log(message);
    }

    showSuccessInformation(message:string, fullscreen:boolean=false){

    }

    showErrorInformation(message:string, fullscreen:boolean=false){
        this._notificationService.error(message);
    }
}
