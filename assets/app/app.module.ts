import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { ActComponent } from "./acts/act.component";
import { ActListComponent } from "./acts/act-list.component";
import { ActInputComponent } from "./acts/act-input.component";
import { ActsComponent } from "./acts/acts.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { LogoutComponent } from "./auth/logout.component";
import { ErrorComponent } from "./errors/error.component";
import { MainComponent } from "./main/main.component";

// services
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service";
import { ActService } from "./acts/act.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ActComponent,
        ActListComponent,
        ActInputComponent,
        ActsComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        LogoutComponent,
        ErrorComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService, ErrorService, ActService],
    bootstrap: [AppComponent]
})
export class AppModule {

}