import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ActService } from "./act.service";
import { Act } from "./act.model";

// renders the act form using template driven form
@Component({
    selector: 'app-act-input',
    templateUrl: './act-input.component.html'
})

export class ActInputComponent implements OnInit {
    act: Act;

    constructor(private actService: ActService) {}

    onSubmit(form: NgForm) {
        if (this.act) {
            // Edit
            this.act.title = form.value.title;
            this.act.category = form.value.category;
            this.act.details = form.value.details;
            this.act.address = form.value.address;
            this.act.capacity = form.value.capacity;
            this.act.picture = form.value.picture;
            this.act.starttime = form.value.starttime;
            this.act.endtime = form.value.endtime;
            this.actService.updateAct(this.act)
                .subscribe(
                    result => {
                        console.log(result),
                        form.resetForm();
                    }
                );
            this.act = null;
        } else {
            // Create
            const act = new Act(
                form.value.title,
                form.value.category,
                form.value.details,
                form.value.address,
                form.value.capacity,
                form.value.picture,
                form.value.starttime,
                form.value.endtime,
                'Max'
            );
            this.actService.addAct(act)
                .subscribe(
                    data => {
                        console.log(data)
                        form.resetForm();
                    }
                    // error => console.error(error)
                );
        }
        
    }

    onClear(form: NgForm) {
        this.act = null;
        form.resetForm();
    }

    ngOnInit() {
        this.actService.actIsEdit.subscribe(
            (act: Act) => this.act = act
        );
    }
}