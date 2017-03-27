import {Employee} from '../../employees/models/employee';
import {Department} from '../../departments/models/department';
import {Position} from '../../positions/models/position';

export class Employment {

    public id: string;
    public employee: Employee;
    public department: Department;
    public position: Position;
    public startDate: string;
    public endDate: string|null;

    constructor(id: string, attributes: any) {
        this.id = id;
        this.employee = attributes.employee;
        this.department = attributes.department;
        this.position = attributes.position;
        this.startDate = attributes.startDate;
        this.endDate = attributes.endDate;
    }

    public static newFromResponse(data: any) {
        return new this(data.id, {
            employee: Employee.newFromResponse(data.employee),
            department: Department.newFromResponse(data.department),
            position: Position.newFromResponse(data.position),
            startDate: data.start_date,
            endDate: data.end_date,
        });
    }

}
