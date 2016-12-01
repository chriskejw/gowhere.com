export class Act {
    title: string;
    username: string;
    actId?: string;
    userId?: string;

    constructor(title: string, username: string, actId?: string, userId?: string) {
        this.title = title;
        this.username = username;
        this.actId = actId;
        this.userId = userId;
    }
}