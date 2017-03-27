export class Employee {

    public id: string;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public email: string;
    public phone: string;
    public currentEmploymentID: string;

    constructor(id: string, attributes: any) {
        this.id = id;
        this.firstName = attributes.firstName;
        this.lastName = attributes.lastName;
        this.birthDate = attributes.birthDate;
        this.email = attributes.email;
        this.phone = attributes.phone;
        this.currentEmploymentID = attributes.currentEmploymentID;
    }

    public static newFromResponse(data: any) {
        return new this(data.id, {
            firstName: data.first_name,
            lastName: data.last_name,
            birthDate: data.birth_date,
            email: data.email,
            phone: data.phone,
            currentEmploymentID: data.current_employment_id,
        });
    }

}
