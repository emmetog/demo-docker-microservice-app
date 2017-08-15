import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavouriteFoodsListComponent} from "./favourite-foods-list-component";

const routes: Routes = [
    {
        path: '',
        component: FavouriteFoodsListComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
