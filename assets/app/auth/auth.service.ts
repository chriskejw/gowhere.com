import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

// an observable third party library to unlock operators such as '.map' and 'Observable.'
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

// @Injectable, adds some metadata so http able to inject service into AuthService Class
@Injectable()
export class AuthService {

    // variable for changing between test and prod
    // environment: string = "http://localhost:3000";
    environment: string = "https://gowhere-wdi6.herokuapp.com";

    constructor(private http: Http, private errorService: ErrorService) {}

    // posts to the node /user post route to save the user
    signup(user: User) {
        // converts the user credentials into JSON string
        // set header to receive data in JSON format
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        // returns an observable
        return this.http.post(`${this.environment}/user`, body, {headers: headers})
            // map operator returns an observable by default, so no need 'Observable.'
            .map((response: Response) => response.json())
            // catch by default does not return an observable automatically,
            // handles and returns an error
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // posts to the node /user/signin route to validate user credentials
    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.environment}/user/signin`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // clears the local storage in the browser, removes the token
    logout() {
        localStorage.clear();
    }

    // checks if a user is logged in, using local storage token
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    // checks if a user is a host, using local storage token
    isHost() {
        return localStorage.getItem('userType') === 'host';
    }
}