export class Weather {
    constructor(
        public city: string,
        public temperature: number,
        public pressure: number,
        public humidity: number,
        public description: string,
        public windSpeed: number,
        public windDegree: number
    ) {

    }
}