export class User {
    id?: number;
    email !: string;
    plainPassword !: string;
    password !: string;
    roles !: string[];
    department !: string;
    notifications !: string[];
    readedNotifications !: string[];
}
