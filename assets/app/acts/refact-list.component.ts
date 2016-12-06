import { Component, OnInit } from "@angular/core";

import { Act } from "./act.model";
import { ActService } from "./act.service";

// acts.component > act-list.component
// placeholder for act.component to render the act
@Component({
    selector: 'app-act-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-act
                   [act]="act"
                    *ngFor="let act of acts">
            </app-act>
        </div>
    `
})

export class ActListComponent implements OnInit {
    // local acts array
    acts: Act[];

    constructor(private actService: ActService) {}

    ngOnInit() {
        // on init, get all the acts from the db
        this.actService.getActs()
            // actService getActs function returns an array of all acts and stores in the local database
            .subscribe(
                (acts: Act[]) => {
                    this.acts = acts;
                }
            );
    }
}