import {Injectable} from '@angular/core';

declare var alertify;

@Injectable()
export class NotificationService {

    _notificationService = alertify;

    constructor() {}

    showInformation(message:string, fullscreen:boolean=false){

    }

    showSuccessInformation(message:string, fullscreen:boolean=false){

    }

    showErrorInformation(message:string, fullscreen:boolean=false){

    }
}
