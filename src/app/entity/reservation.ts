import { User } from "./user";

export class Reservation {
    id ?: number;
    salle !: string;
    dateDeb !: Date;
    dateFin !: Date;
    responsable !: string; 
    users !: string[];
}
