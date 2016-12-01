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
    myForm: FormGroup;
    host: boolean = false;

    constructor(private authService: AuthService) {}

    // when signup submit button clicked, create a new user using the form's values
    // run authService function 'signup' which posts the variable 'user' to node for saving
    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.usertype,
            this.myForm.value.username
        );
        // the service function 'signup' returns an observable so we have to use subscribe to retrieve it
        // subscribe sends the request and logs the callbacks
        // .subscribe(success, error, complete), not using complete
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        // reset the form
        this.myForm.reset();
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
            password: new FormControl(null, Validators.required),
            usertype: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.required),
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
}