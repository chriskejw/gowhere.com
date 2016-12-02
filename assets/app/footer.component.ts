import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    template: `
<footer class="footer">

        <hr />

        <div class="row">
            <div class="col-lg-12">
                <ul class="nav nav-pills nav-justified ">
                    <li><a href="/">About</a></li>
                    <li><a href="/">Sign Up</a></li>
                    <li><a href="/">Log In</a></li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <ul class="nav nav-pills nav-justified">
                    <li class="col-lg-4"><a href="/">© 2016 GoWhere.com</a></li>
                    <li class="col-lg-4"><a href="/">Terms of Service</a></li>
                    <li class="col-lg-4"><a href="/">Privacy</a></li>
                </ul>
            </div>
        </div>

</footer>
    `
})
export class FooterComponent {

}