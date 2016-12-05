///<reference path="../node_modules/@types/core-js/index.d.ts"/>
import {Injectable} from '@angular/core';

import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {FavouriteFood} from "./favourite-food";

@Injectable()
export class FavouriteFoodService {

    private favouriteFoodsUrl = 'http://127.0.0.1:82/favourite-foods';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getFavouriteFoods(): Promise<FavouriteFood[]> {
        return this.http.get(this.favouriteFoodsUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as FavouriteFood[])
            .catch(this.handleError);
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