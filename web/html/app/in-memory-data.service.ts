import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let foods = [
            {id: 1, person: 'Peter', food: 'Pasta Bolognese'},
            {id: 2, person: 'John', food: 'Pizza'},
            {id: 3, person: 'Maria', food: 'Omelet'},
        ];
        return {'favourite-foods': foods};
    }
}