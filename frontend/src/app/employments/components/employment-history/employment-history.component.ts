import {Component, Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Employment} from '../../models/employment';
import {Employee} from '../../../employees/models/employee';
import {EmploymentService} from '../../services/employment.service';
import {MessageService} from '../../../common/services/message.service';
import {ResponseError} from '../../../common/models/errors';


@Component({
    selector: 'employment-history',
    templateUrl: 'employment-history.component.html',
    styleUrls: [
        'employment-history.component.scss'
    ]
})

export class EmploymentHistoryComponent implements OnInit {

    @Input()
    employee: Employee;
    employments: Employment[];

    constructor(
        private employmentSrv: EmploymentService,
        private msgSrv: MessageService,
    ) {}

    ngOnInit(): void {
        this.getEmployments();
    }

    private getEmployments(): void {
        this.employmentSrv
            .list(this.employee.id)
            .then((employments: Employment[]) => this.employments = employments)
            .catch((errors: ResponseError[]) => {
                errors.forEach(error => this.msgSrv.error(error.detail));
            });
    }

}
