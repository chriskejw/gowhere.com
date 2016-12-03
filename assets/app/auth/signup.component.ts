import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [`
        .radiotext, label, span {
            color: white;
        }
        input.ng-invalid.ng-touched {
            border: 1px solid red;
            color: darkred;
        }
        span.danger {
            color: red;
        }
    `]
})
export class SignupComponent implements OnInit {
    // set myForm variable as a type of FormGroup
    // host local variable to differentiate participant and host sign up
    // char local variables to show user minimum length of field
    myForm: FormGroup;
    host: boolean = false;
    usernameLabel: string = 'Username';
    passwordchar: number;
    usernamechar: number;

    constructor(private authService: AuthService) {}

    // when signup submit button clicked, create a new user using the form's values
    // run authService function 'signup' which posts the variable 'user' to node for saving
    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.usertype,
            this.myForm.value.username,
            this.myForm.value.hostcode
        );
        // the service function 'signup' returns an observable so we have to use subscribe to retrieve it
        // subscribe sends the request and logs the callbacks
        // .subscribe(success, error, complete), not using complete
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data)
                    this.myForm.reset();
                },
                error => console.error(error)
            );
    }

    // FormGroup quite heavy so not used in the constructor
    ngOnInit() {
        /** example of a reactive (data-driven) form
        * this form tells ng not to autodetect and create the form for us, but use our form instead
        *
        * FormGroup({key: value})
        * FormControl(initial value, validator), null so field is empty at start
        * require and pattern are built in validators from @angular/forms
        * validators.required => tells form that field required
        * validators.pattern => ensures field matches regex provided
        **/
        this.myForm = new FormGroup({
            // more than one validator, use array
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12)
            ]),
            usertype: new FormControl(null, Validators.required),
            username: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]),
            hostcode: new FormControl(null)
        });
    }

    // typeChange function called when press radio button usertype, change form view
    typeChange(value: string) {
        if (value == "host") {
            this.host = true
            this.usernameLabel = 'Company name'
        } else {
            this.host = false
            this.usernameLabel = 'Username'
        }
    }
    
    // on keyup, count the length of password and username and place in the view
    // this.myForm.value. because value could be null and can't count length
    inputCounter() {
        this.passwordchar = 6;
        if (this.myForm.value.password) {
            this.passwordchar -= this.myForm.value.password.length
        }
        this.usernamechar = 6;
        if (this.myForm.value.username) {
            this.usernamechar -= this.myForm.value.username.length
        }
    }
}