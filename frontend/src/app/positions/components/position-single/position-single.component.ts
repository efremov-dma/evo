import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {MessageService} from '../../../common/services/message.service';
import {PositionService} from '../../services/position.service';
import {Position} from '../../models/position';
import {ResponseError} from '../../../common/models/errors';


@Component({
    templateUrl: 'position-single.component.html',
    styleUrls: [
        'position-single.component.scss'
    ],
})

export class PositionSingleComponent implements OnInit, OnDestroy {

    params: {
        positionId: string
    };

    position: Position;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
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
            };
        });
    }

    private initPosition() {
        this.positionSrv
            .get(this.params.positionId)
            .then((position: Position) => this.position = position)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail));
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
