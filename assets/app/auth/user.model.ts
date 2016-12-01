//export user model with optional params, usertype and username because of signin
export class User {
    constructor(public email: string,
                public password: string,
                public usertype?: string,
                public username?: string) {}
}