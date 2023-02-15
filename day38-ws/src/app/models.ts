export class WeatherResult {
    constructor(
        public city: string,
        public description: string,
        public temperature: number,
        public feelsLike: number,
        public tempMin: number,
        public tempMax: number,
    ) {}
}

export interface City {
    cityId: number
    name: string
}