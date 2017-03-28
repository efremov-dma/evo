import {Department} from '../../departments/models/department';
import {Position} from '../../positions/models/position';

export class Vacancy {

    public id: string;
    public department: Department;
    public position: Position;
    public openingDate: string;
    public closingDate: string|null;

    constructor(id: string, attributes: any) {
        this.id = id;
        this.department = attributes.department;
        this.position = attributes.position;
        this.openingDate = attributes.openingDate;
        this.closingDate = attributes.closingDate;
    }

    public static newFromResponse(data: any) {
        return new this(data.id, {
            department: Department.newFromResponse(data.department),
            position: Position.newFromResponse(data.position),
            openingDate: data.opening_date,
            closingDate: data.closing_date,
        });
    }

}
