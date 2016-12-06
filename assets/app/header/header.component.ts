import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DropdownDirective } from './dropdown.directive';

import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private authService: AuthService, private router: Router) {}

    // authService function isLoggedIn, checks for token in localstorage and returns boolean
    // if true, show logout
    // if false, show signup and signin
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    isAHost() {
        return this.authService.isHost();
    }

    // authService function onLogout clears the token in local storage and redirects to /auth/signin
    onLogout() {
        this.authService.logout();
        this.router.navigate(['/', 'signin']);
    }
}