import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PositionService} from '../../services/position.service';
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../models/position';
import {Subscription} from 'rxjs';
import {ResponseError} from '../../../common/models/errors';

@Component({
    selector: 'position-edit',
    templateUrl: 'position-edit.component.html',
    styleUrls: [
        'position-edit.component.scss'
    ],
})

export class PositionEditComponent implements OnInit, OnDestroy {

    params: {
        positionId: string
    };

    position: Position;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private positionSrv: PositionService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initPosition();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                positionId: params['positionId']
            }
        });
    }

    private initPosition() {
        this.positionSrv
            .get(this.params.positionId)
            .then(position => this.position = position)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
