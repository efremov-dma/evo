import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Position} from '../../models/position';
import {MessageService} from '../../../common/services/message.service';
import {PositionService} from '../../services/position.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
    templateUrl: 'position-list.component.html',
    styleUrls: [
        'position-list.component.scss'
    ]
})

export class PositionListComponent implements OnInit {

    positions: Position[];

    constructor(
        private positionSrv: PositionService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit(): void {
        this.getPositions();
    }

    private getPositions(): void {
        this.positionSrv
            .list()
            .then(positions => this.positions = positions)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

}
