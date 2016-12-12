export class Act {
    title: string;
    details: string;
    address: string;
    thumbnail: string;
    websiteurl: string;
    starttime: Date;
    endtime: Date;
    username?: string;
    actId?: string;
    userId?: string;


    constructor(
        title: string,
        details: string,
        address: string,
        thumbnail: string,
        websiteurl:string,
        starttime: Date,
        endtime: Date,
        username?: string,
        actId?: string,
        userId?: string) {
            this.title = title;
            this.details = details;
            this.address = address;
            this.thumbnail = thumbnail;
            this.websiteurl = websiteurl;
            this.starttime = starttime;
            this.endtime = endtime;
            this.username = username;
            this.actId = actId;
            this.userId = userId;
        }
}