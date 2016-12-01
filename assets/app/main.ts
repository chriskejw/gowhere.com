// first file to run when import bundle.js from index.hbs
// imports polyfills and bootstraps appmodule to start ng application

import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);