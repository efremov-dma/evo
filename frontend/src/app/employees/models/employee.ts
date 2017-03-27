export class Employee {

    public id: string;
    public firstName: string;
    public lastName: string;

    constructor(id: string, attributes: any) {
        this.id = id;
        this.firstName = attributes.firstName;
        this.lastName = attributes.lastName;
    }

    public static newFromResponse(data: any) {
        return new this(data.id, {
            firstName: data.first_name,
            lastName: data.last_name,
        });
    }

}
