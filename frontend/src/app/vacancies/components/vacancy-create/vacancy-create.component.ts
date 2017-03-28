import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Department} from '../../../departments/models/department';
import {Subscription} from 'rxjs';
import {DepartmentService} from '../../../departments/services/department.service';
import {MessageService} from '../../../common/services/message.service';
import {Position} from '../../../positions/models/position';
import {PositionService} from '../../../positions/services/position.service';
import {ResponseError} from '../../../common/models/errors';

@Component({
    selector: 'vacancy-create',
    templateUrl: 'vacancy-create.component.html',
    styleUrls: [
        'vacancy-create.component.scss'
    ],
})

export class VacancyCreateComponent implements OnInit, OnDestroy {

    params: {
        departmentId: string
    };

    department: Department;
    positions: Position[];
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private departmentSrv: DepartmentService,
        private positionSrv: PositionService,
        private msgSrv: MessageService
    ) {}

    ngOnInit() {
        this.initParams();
        this.initDepartment();
        this.initPositions();
    }

    private initParams() {
        this.sub = this.route.params.subscribe(params => {
            this.params = {
                departmentId: params['departmentId']
            }
        });
    }

    private initDepartment() {
        this.departmentSrv
            .get(this.params.departmentId)
            .then(department => this.department = department)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    private initPositions() {
        this.positionSrv
            .list()
            .then(positions => this.positions = positions)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail))
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
