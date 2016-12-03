import { Component, Input } from "@angular/core";

import { Act } from "./act.model";
import { ActService } from "./act.service";

// acts.component > act-list.component > act.component
// act.component is a panel showing individual acts, with edit and delete functions
@Component({
    selector: 'app-act',
    templateUrl: './act.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }

        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class ActComponent {
    
    // receives a act as an input, from the parent, act-list.component
    @Input() act: Act;

    constructor(private actService: ActService) {}

    // actService function editAct edits the act in mongo
    onEdit() {
        this.actService.editAct(this.act);
    }

    // actService function deleteAct removes the act in mongo
    onDelete() {
        this.actService.deleteAct(this.act)
            // console.log the return value which is the deleted act
            .subscribe( result => console.log(result) );
    }
    
    // belongsToUser function returns a boolean
    // if current user is the author of the act, show the edit and delete functions
    belongsToUser() {
        return localStorage.getItem('userId') == this.act.userId;
    }
}