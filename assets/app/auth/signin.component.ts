import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: [`
        label, span {
            color: white;
        }
        input.ng-invalid.ng-touched {
            border: 1px solid red;
            color: darkred;
        }
    `]
})
export class SigninComponent {
    // set myForm variable as a type of FormGroup
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    // when signin submit button clicked, check user credentials in backend
    // run authService function signin which posts the variable 'user' to node for validation
    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password
        );
        this.authService.signin(user)
            .subscribe(
                // on successful signin, store the response in the localStorage as a token
                // redirect to '/' route
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                    this.myForm.reset();
                },
                error => {
                    console.error(error);
                }
            );
    }

    // FormGroup quite heavy so not used in the constructor
    ngOnInit() {
        // refer to SIGNUP component for a better understanding of FormGroup, FormControl, validators
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}