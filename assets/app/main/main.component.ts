import { Component, OnInit } from '@angular/core';
import { ActService } from '../acts/act.service';
import { Act } from '../acts/act.model';

// why actService in appcomponent! REFACTOR
@Component({
    selector: 'my-home-app',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    act: Act;
    acts: Act [] = [];
    constructor(private actService: ActService) {}
    
    showDetails(act: Act) {
        this.act = act;
        alert(this.act.title);
    }

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