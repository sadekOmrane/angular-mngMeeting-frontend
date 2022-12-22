import { Reservation } from "./reservation"
import { User } from "./user"

export class NotifInfo {
    responsableEmail !: string;
    reunionDate !: Date;
    message !: string;
    isReaded !: boolean;
}