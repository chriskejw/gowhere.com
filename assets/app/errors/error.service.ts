import { EventEmitter } from "@angular/core";

import { Error } from "./error.model";

// no need @Injectable, as not injecting metadata from http
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    // creates and emits a new error based on the Error model
    handleError(error: any) {
        const errorData = new Error(error.title, error.error.act);
        this.errorOccurred.emit(errorData);
    }
}