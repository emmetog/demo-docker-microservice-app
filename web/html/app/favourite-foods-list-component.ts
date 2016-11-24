import {Component, OnInit} from "@angular/core";
import {FavouriteFood} from "./favourite-food";
import {FavouriteFoodService} from "./favourite-food.service";

@Component({
    selector: 'fav-foods',
    template: `
            <h2>My Favourite Foods</h2>
            
            <ul>
                <li *ngFor="let food of foods">{{ food.person }} loves {{ food.food }}</li>
            </ul>
            `,
})

export class FavouriteFoodsListComponent implements OnInit {

    private foods: FavouriteFood[];

    constructor(private favFoodService: FavouriteFoodService) {}

    ngOnInit() {
        this.favFoodService.getFavouriteFoods()
            .then(foods => this.foods = foods);
    }

}