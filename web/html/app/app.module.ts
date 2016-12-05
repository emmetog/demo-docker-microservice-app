import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import './rxjs-extensions';

import {AppComponent} from './app.component';
import {FavouriteFoodsListComponent} from "./favourite-foods-list-component";
import {FavouriteFoodService} from "./favourite-food.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        FavouriteFoodsListComponent,
    ],
    providers: [
        FavouriteFoodService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}