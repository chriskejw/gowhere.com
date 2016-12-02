import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    // set myForm variable as a type of FormGroup
    // host local variable to differentiate participant and host sign up
    // char local variables to show user minimum length of field
    myForm: FormGroup;
    host: boolean = false;
    passwordchar: number = 6;
    usernamechar: number = 6;

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
                Validators.minLength(6)
            ]),
            usertype: new FormControl(null, Validators.required),
            username: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            hostcode: new FormControl(null)
        });
    }

    // typeChange function called when press radio button usertype, change form view
    typeChange(value: string) {
        if (value == "host") {
            this.host = true;
            document.getElementById('hostname').textContent = 'Company name'
        } else {
            this.host = false;
            document.getElementById('hostname').textContent = 'Username'
        }
    }
    
    // on keyup, count the length of password and place in the view
    passwordCounter() {
        if (this.myForm.value.password.length <= 6) {
            this.passwordchar = 6 - this.myForm.value.password.length
        } else {
            this.passwordchar = 0
        }
    }

    // on keyup, count the length of username and place in the view
    usernameCounter() {
        if (this.myForm.value.username.length <= 6) {
            this.usernamechar = 6 - this.myForm.value.username.length
        } else {
            this.usernamechar = 0
        }
    }
}