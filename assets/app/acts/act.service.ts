import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

// an observable third party library to unlock operators such as '.map' and 'Observable.'
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Act } from "./act.model";
import { ErrorService } from "../errors/error.service";

// @Injectable, adds some metadata so http able to inject service into AuthService Class
@Injectable()
export class ActService {
    private acts: Act[] = [];
    actIsEdit = new EventEmitter<Act>();

    // variable for changing between test and prod
    environment: string = "http://localhost:3000";
    // environment: string = "https://gowhere-wdi6.herokuapp.com";

    constructor(private http: Http, private errorService: ErrorService) { }

    // adds a act through http to node
    // (refer to authService for more details on this.http)
    addAct(act: Act) {
        const body = JSON.stringify(act);
        const headers = new Headers({'Content-Type': 'application/json'});

        // set token to a const, token used in node using req.query for validation
        // token is decoded to get user id
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        
        // post to node /act with token as req.query
        return this.http.post(`${this.environment}/act` + token, body, {headers: headers})
            // response is the new created act
            // .map uses the response to create and push the new act to the local acts array for consistency between other functions
            // the new created act is returned and used in act-input.component
            .map((response: Response) => {
                const result = response.json();
                const act = new Act(
                    result.obj.title,
                    result.obj.category,
                    result.obj.details,
                    result.obj.address,
                    result.obj.capacity,
                    result.obj.picture,
                    result.obj.thumbnail,
                    result.obj.websiteurl,
                    result.obj.starttime,
                    result.obj.endtime,
                    result.obj.user.username,
                    result.obj._id,
                    result.obj.user._id);
                this.acts.push(act);
                return act;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // gets all the acts from node through http
    // (refer to authService for more details on this.http)
    getActs() {
        return this.http.get(`${this.environment}/act`)
            // response is all the acts returned from node get /acts
            // response is pushed and returned as an array of acts, to the act-list.component
            // the local acts array is replaced for consistency between other functions
            .map((response: Response) => {
                const acts = response.json().obj;
                let transformedActs: Act[] = [];
                for (let act of acts) {
                    transformedActs.push(new Act(
                        act.title,
                        act.category,
                        act.details,
                        act.address,
                        act.capacity,
                        act.picture,
                        act.thumbnail,
                        act.websiteurl,
                        act.starttime,
                        act.endtime,
                        act.user.username,
                        act._id,
                        act.user._id)
                    );
                }
                this.acts = transformedActs;
                return transformedActs;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /* emits the act user wants to edit to act-input component,
    which is subscribed to the event emitter*/
    editAct(act: Act) {
        this.actIsEdit.emit(act);
    }

    // updates the existing act to node patch /acts/:id through http
    // (refer to authService for more details on this.http)
    // (refer to addAct above for more details on token)
    updateAct(act: Act) {
        const body = JSON.stringify(act);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        
        // patch to node /act/:id with token as req.query
        return this.http.patch(`${this.environment}/act/` + act.actId + token, body, {headers: headers})
            // response is the updated act as a json used in act-input.component
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // removes act from both node and local array 'acts'
    deleteAct(act: Act) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        // delete to node /act/:id with token as req.query
        return this.http.delete(`${this.environment}/act/` + act.actId + token)
            // on success, act is removed from local acts array too
            // response is the deleted act in json, used in act.component
            .map((response: Response) => {
                this.acts.splice(this.acts.indexOf(act), 1);
                response.json()
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    joinAct(act: Act) {
        
    }
}