import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService) {}

    // to simulate error modal closed with display none
    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        /** errorService function errorOccurred shows the error modal with the error act
        * subscribe gets the error emitted
        * assigns it to the local variable 'error',
        * and changes display to 'block'
        **/
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}