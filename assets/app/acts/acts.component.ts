import { Component } from "@angular/core";

// renders the act-input and act-list components when navigate to route
@Component({
    selector: 'app-acts',
    template: `
        <div class="row">
            <app-act-input></app-act-input>
        </div>
        
        <div class="row">
            <app-act-list></app-act-list>
        </div>
    `
})

export class ActsComponent { }