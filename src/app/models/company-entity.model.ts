
export class CompanyEntity {
    id: number;
    name: string;
    company_id: number;

    constructor(id: number, name: string, company_id: number) {
        this.id = id;
        this.name = name;
        this.company_id = company_id;
    }

}
