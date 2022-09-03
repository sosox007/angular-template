
export class Team {
    id: number;
    name: string;
    departement_id: number;

    constructor(id: number, name: string, departement_id: number) {
        this.id = id;
        this.name = name;
        this.departement_id = departement_id;
    }

}