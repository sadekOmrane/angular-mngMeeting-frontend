export class ReadedNotification {
    id?:number;
    user !: string;
    notification!: string;
    state !: boolean;
    readAt !: Date;
}
