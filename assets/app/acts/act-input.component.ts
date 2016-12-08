import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ErrorService } from "../errors/error.service";
import { ActService } from "./act.service";
import { AuthService } from "../auth/auth.service";
import { Act } from "./act.model";
import { Router } from "@angular/router";

import 'rxjs/Rx';
import { Observable } from "rxjs";

// acts.component > act-input.component
// renders the act form using template driven form
@Component({
    selector: 'app-act-input',
    templateUrl: './act-input.component.html',
    styles: [`
        h3 {
            color: white;
        }
        label, span {
            color: white;
        }
        input.ng-invalid.ng-touched {
            border: 1px solid red;
            color: darkred;
        }
        textarea.ng-invalid.ng-touched {
            border: 1px solid red;
            color: darkred;
        }
        span.danger {
            color: #D23029;
        }
        article.popDown img {
            margin-bottom: 30px;
        }
    `]
})

export class ActInputComponent implements OnInit {
    myForm: FormGroup;
    act: Act;
    titlechar: number;
    detailschar: number;
    thumbnailinput: string;
    mindateinput: string = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}T${(new Date().getHours())}:00:00`;
    maxdateinput: string = `${new Date().getFullYear() + 2}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}T${(new Date().getHours())}:00:00`;

    constructor(
        private actService: ActService,
        private authService: AuthService,
        private errorService: ErrorService,
        private router: Router) {}
    
    onSubmit() {
        let startdate = new Date(this.myForm.value.starttime)
        let enddate = new Date(this.myForm.value.endtime)
        let plusOneHour = new Date(startdate.setHours(startdate.getHours() + 1))
        let plusSixMonths = new Date(startdate.setMonth(startdate.getMonth() + 6))

        if (new Date(this.myForm.value.starttime) > enddate || enddate < plusOneHour || enddate > plusSixMonths) {
            let error: any
            if (new Date(this.myForm.value.starttime) < plusOneHour) {
                error = { 
                    'title': 'Invalid Date',
                    'error': {
                        'message': 'Start time must be an hour more than current time.'
                    }
                }
            }
            if (new Date(this.myForm.value.starttime) > enddate || enddate < plusOneHour) {
                error = { 
                    'title': 'Invalid Date',
                    'error': {
                        'message': 'End time must be at least one hour after Start time.'
                    }
                }
            }
            if (enddate > plusSixMonths) {
                error = { 
                    'title': 'Invalid Date',
                    'error': {
                        'message': 'An event cannot be more than 6 months long.'
                    }
                }
            }
            this.errorService.handleError(error);
            return Observable.throw(error);
        } else {
            // create a new act
            const act = new Act(
                this.myForm.value.title,
                this.myForm.value.details,
                this.myForm.value.address,
                this.myForm.value.thumbnail,
                this.myForm.value.websiteurl,
                this.myForm.value.starttime,
                this.myForm.value.endtime
            );
            this.actService.addAct(act)
                .subscribe(
                    data => {
                        console.log(data)
                        this.myForm.reset();
                    },
                    error => console.error(error)
                );
        }
    }

    onClear() {
        this.act = null;
        this.myForm.reset();
    }

    // on keyup, count the length of title and place in the view
    // this.myForm.value.title because value could be null and can't count length
    inputCounter() {
        this.titlechar = 6;
        if (this.myForm.value.title) {
            this.titlechar -= this.myForm.value.title.length
        }
        this.detailschar = 50;
        if (this.myForm.value.details) {
            this.detailschar -= this.myForm.value.details.length
        }
        this.thumbnailinput = this.myForm.value.thumbnail
    }

    ngOnInit() {
        // authService function isLoggedIn, checks for token in localstorage and returns boolean
        // if false, means not login, show route to homepage
        if (!this.authService.isHost()) {
            this.router.navigateByUrl('/');
        }

        interface ValidationResult {
            [key:string]:boolean;
        }

        class DateValidator {

            static futureDate(formcontrol: FormControl): ValidationResult {
                // convert to date with hour
                // minus 8 hour from inputdate because of utc
                let inputdate = new Date(formcontrol.value)
                let now = new Date()
                let inputdatetime = new Date(inputdate.setHours(inputdate.getHours() - 8))
                let presentdatetime = new Date(now.setHours(now.getHours()))
                let futuredatetime = new Date(now.setFullYear(now.getFullYear() + 2))

                // now + 1 hour < input date < now + 1 hour + 2 year
                // if input doesn't fulfill criteria above, return future date true / error
                if ( formcontrol.value && inputdatetime < presentdatetime || formcontrol.value && inputdatetime > futuredatetime) {
                    return { "futureDate": true };
                }
                // input fulfills criteria
                return null;
            }
        }

        // form validations
        this.myForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(40)
            ]),
            details: new FormControl(null, [
                Validators.required,
                Validators.minLength(50),
                Validators.maxLength(400)
            ]),
            address: new FormControl(null, Validators.required),
            thumbnail: new FormControl(null, [
                Validators.required,
                Validators.pattern("(https?:\/\/.*\.(?:png|jpg|jpeg|PNG|JPG|JPEG))")
            ]),
            websiteurl: new FormControl(null, [
                Validators.pattern("(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)|www\.[^\s]+\.[^\s]{2,}")
            ]),
            starttime: new FormControl(null, [
                Validators.required,
                DateValidator.futureDate
            ]),
            endtime: new FormControl(null, [
                Validators.required,
                DateValidator.futureDate
            ])
        });
    }
}