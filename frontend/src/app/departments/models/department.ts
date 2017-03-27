export class Department {

    public id: string;
    public name: string;
    public description: string;
    public headId: string;

    constructor(id: string, attributes: any) {
        this.id = id;
        this.name = attributes.name;
        this.description = attributes.description;
        this.headId = attributes.headId;
    }

    public static newFromResponse(data: any) {
        return new this(data.id, {
            name: data.name,
            description: data.description,
            headId: data.head_id,
        });
    }

}
