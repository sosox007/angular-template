
export class Departement {
    id: number;
    name: string;
    companyEntity_id: number;

    constructor(id: number, name: string, companyEntity_id: number) {
        this.id = id;
        this.name = name;
        this.companyEntity_id = companyEntity_id;
    }

}