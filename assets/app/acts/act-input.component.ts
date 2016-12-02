import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ActService } from "./act.service";
import { Act } from "./act.model";

// acts.component > act-input.component
// renders the act form using template driven form
@Component({
    selector: 'app-act-input',
    templateUrl: './act-input.component.html'
})

export class ActInputComponent implements OnInit {
    myForm: FormGroup;
    act: Act;
    categories: string[];

    constructor(private actService: ActService) {
        this.categories = ["eat", "drink", "fashion", "sports", "music", "art",
                    "networking", "beauty", "home", "entertainment"]
    }

    onSubmit() {
        // if this.act is not null, means there is an act to edit
        if (this.act) {
            this.act.title = this.myForm.value.title;
            this.act.category = this.myForm.value.category;
            this.act.details = this.myForm.value.details;
            this.act.address = this.myForm.value.address;
            this.act.capacity = this.myForm.value.capacity;
            this.act.picture = this.myForm.value.picture;
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
                this.myForm.value.starttime,
                this.myForm.value.endtime,
                'Max'
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

    ngOnInit() {
        // listening to actService's event emitter which activates when edit pressed
        // this.act values are placed in the form because of [ngModel] in the html
        this.actService.actIsEdit.subscribe(
            (act: Act) => this.act = act
        );

        // form validations
        this.myForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            category: new FormControl(null, Validators.required),
            details: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required),
            capacity: new FormControl(null, Validators.required),
            picture: new FormControl(null, Validators.required),
            starttime: new FormControl(null),
            endtime: new FormControl(null)
        });
    }
}