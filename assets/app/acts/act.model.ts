export class Act {
    title: string;
    category: string;
    details: string;
    address: string;
    capacity: number;
    picture: string;
    starttime: Date;
    endtime: Date;
    username: string;
    actId?: string;
    userId?: string;

    constructor(
        title: string, category: string, details: string, address: string,
        capacity: number, picture: string, starttime: Date, endtime: Date,
        username: string, actId?: string, userId?: string) {
        this.title = title;
        this.category = category;
        this.details = details;
        this.address = address;
        this.capacity = capacity;
        this.picture = picture;
        this.starttime = starttime;
        this.endtime = endtime;
        this.username = username;
        this.actId = actId;
        this.userId = userId;
    }
}