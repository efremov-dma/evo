import {Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';


@Injectable()
export class MessageService {

    constructor(
        private toasterSrv: ToasterService
    ) {}

    success(msg: string) {
        this.toasterSrv.pop('success', msg);
    }

    error(msg: string) {
        this.toasterSrv.pop('error', msg);
    }
}