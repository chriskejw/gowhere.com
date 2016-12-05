import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ErrorService } from "../errors/error.service";
import { ActService } from "./act.service";
import { Act } from "./act.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

// acts.component > act-input.component
// renders the act form using template driven form
@Component({
    selector: 'app-act-input',
    templateUrl: './act-input.component.html',
    styles: [`
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
            color: red;
        }
    `]
})

export class ActInputComponent implements OnInit {
    myForm: FormGroup;
    act: Act;
    categories: string[];
    titlechar: number;
    detailschar: number;
    capchar: number;
    mindateinput: string = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}T${(new Date().getHours() + 1)}:00:00`;
    maxdateinput: string = `${new Date().getFullYear() + 2}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}T${(new Date().getHours() + 1)}:00:00`;

    constructor(private actService: ActService, private errorService: ErrorService) {
        this.categories = ["eat", "drink", "fashion", "sports", "music", "art",
                    "networking", "beauty", "home", "entertainment"]
    }
    
    onSubmit() {
        let startdate = new Date(this.myForm.value.starttime)
        let enddate = new Date(this.myForm.value.endtime)
        let plusOneHour = new Date(startdate.setHours(startdate.getHours() + 1))
        let plusSixMonths = new Date(startdate.setMonth(startdate.getMonth() + 6))

        if (new Date(this.myForm.value.starttime) > enddate || enddate < plusOneHour || enddate > plusSixMonths) {
            let error: any
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
             // if this.act is not null, means there is an act to edit
            if (this.act) {
                this.act.title = this.myForm.value.title;
                this.act.category = this.myForm.value.category;
                this.act.details = this.myForm.value.details;
                this.act.address = this.myForm.value.address;
                this.act.capacity = this.myForm.value.capacity;
                this.act.picture = this.myForm.value.picture;
                this.act.thumbnail = this.myForm.value.thumbnail;
                this.act.websiteurl = this.myForm.value.websiteurl;
                this.act.starttime = this.myForm.value.starttime;
                this.act.endtime = this.myForm.value.endtime;

                // actService updateAct returns the updated act if successful
                this.actService.updateAct(this.act)
                    .subscribe(
                        result => {
                            console.log(result),
                            this.myForm.reset();
                        }
                    );
                this.act = null;
            } else {
                // create a new act
                const act = new Act(
                    this.myForm.value.title,
                    this.myForm.value.category,
                    this.myForm.value.details,
                    this.myForm.value.address,
                    this.myForm.value.capacity,
                    this.myForm.value.picture,
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
        this.detailschar = 20;
        if (this.myForm.value.details) {
            this.detailschar -= this.myForm.value.details.length
        }
        if (this.myForm.value.capacity) {
            this.capchar = this.myForm.value.capacity
        }
    }

    ngOnInit() {
        // listening to actService's event emitter which activates when edit pressed
        // this.act values are placed in the form because of [ngModel] in the html
        this.actService.actIsEdit.subscribe(
            (act: Act) => this.act = act
        );

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
                let presentdatetime = new Date(now.setHours(now.getHours() + 1))
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
            category: new FormControl(null, Validators.required),
            details: new FormControl(null, [
                Validators.required,
                Validators.minLength(20),
                Validators.maxLength(100)
            ]),
            address: new FormControl(null, Validators.required),
            capacity: new FormControl(null, [
                Validators.pattern("^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9])$")
            ]),
            picture: new FormControl(null, [
                Validators.required,
                Validators.pattern("(https?:\/\/.*\.(?:png|jpg|jpeg|PNG|JPG|JPEG))")
            ]),
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