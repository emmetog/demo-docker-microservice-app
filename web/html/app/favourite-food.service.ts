///<reference path="../node_modules/@types/core-js/index.d.ts"/>
import {Injectable} from '@angular/core';

import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {FavouriteFood} from "./favourite-food";

@Injectable()
export class FavouriteFoodService {

    // private favouriteFoodsUrl = 'http://expensesync.nimblewarestudios.com/users/1683/accounts';
    private favouriteFoodsUrl = 'api/favourite-foods';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getFavouriteFoods(): Promise<FavouriteFood[]> {
        return this.http.get(this.favouriteFoodsUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as FavouriteFood[])
            .catch(this.handleError);
    }

    getFavouriteFood(id: number): Promise<FavouriteFood> {
        return this.getFavouriteFoods()
            .then(favFoods => favFoods.find(favFood => favFood.id === id));
    }

    create(person: String, food: String): Promise<FavouriteFood> {
        return this.http
            .post(this.favouriteFoodsUrl, JSON.stringify({person: person, food: food}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo only

        return Promise.reject(error.message || error);
    }
}