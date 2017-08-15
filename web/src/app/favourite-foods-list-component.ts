import {Component, OnInit} from "@angular/core";
import {FavouriteFood} from "./favourite-food";
import {FavouriteFoodService} from "./favourite-food.service";

@Component({
    selector: 'fav-foods',
    template: `
            <h2>My Favourite Foods</h2>
            
            <div>
                <label>Person:</label> <input #personName placeholder="Peter" />
                <label>Food:</label> <input #foodName placeholder="Pizza"/>
                <button (click)="add(personName.value, foodName.value); personName.value=''; foodName.value=''">
                    Add
                </button>
            </div>
            
            <ul>
                <li *ngFor="let food of foods">{{ food.person }} loves {{ food.food }}</li>
            </ul>
            `,
})

export class FavouriteFoodsListComponent implements OnInit {

    private foods: FavouriteFood[];

    constructor(private favFoodService: FavouriteFoodService) {}

    ngOnInit() {
        this.getAllFavourites();
    }

    private getAllFavourites() {
        this.favFoodService.getFavouriteFoods()
            .then(foods => this.foods = foods);
    }

    add(personName: string, foodName: string)
    {
        console.log('Adding new favourite food: ' + personName + ' loves ' + foodName);

        this.favFoodService.create(personName, foodName)
            .then(food => this.foods.push(food));
    }
}
