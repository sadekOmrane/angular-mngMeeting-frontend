export class Department {
    id?: number;
    libelle: String;

    constructor(args: Department){
        this.id=args.id;
        this.libelle=args.libelle;
    }
}
