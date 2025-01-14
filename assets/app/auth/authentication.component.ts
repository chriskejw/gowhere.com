import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signup']">Signup</a></li>
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
                    <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row">
           <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent {
    constructor(private authService: AuthService) {}

    // authService function isLoggedIn, checks for token in localstorage and returns boolean
    // if true, show logout
    // if false, show signup and signin
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}