import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { City } from "./models";

@Injectable()
export class CitiesRepository extends Dexie {

    cities!: Dexie.Table<City, number>

    constructor() {
        super('day38-ws')
        this.version(1).stores({
            cities: '++cityId'
        })
        this.cities = this.table('cities')
    }

    getCities(): Promise<City[]> {
        return this.cities.toArray()
    }

    addCity(city: City): Promise<number> {
        return this.cities.add(city)
    }

    deleteCity(key: number) {
        this.cities.delete(key)
    }
}