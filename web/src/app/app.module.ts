import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";

import {FavouriteFoodsListComponent} from "./favourite-foods-list-component";
import {FavouriteFoodService} from "./favourite-food.service";

@NgModule({
  declarations: [
    AppComponent,
    FavouriteFoodsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [FavouriteFoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
