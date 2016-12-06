import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { routing } from "./app.routing";
import { ActInputComponent } from "./acts/act-input.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { ErrorComponent } from "./errors/error.component";
import { MainComponent } from "./main/main.component";
import { MainDetailComponent } from "./main/main-detail/main-detail.component";
import { DropdownDirective } from './header/dropdown.directive';
import { MyEventsComponent } from './my/my-events/my-events.component';

// services
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service";
import { ActService } from "./acts/act.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ActInputComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent,
        MainComponent,
        MainDetailComponent,
        DropdownDirective,
        MyEventsComponent
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