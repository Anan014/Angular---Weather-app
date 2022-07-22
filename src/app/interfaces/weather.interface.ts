export interface Weather {
    cod: string;
    message: number;
    cnt: number;
    list: list[];
    city: cityObject;
}

export interface list {
    dt: number;
    main: listMainObj;
    weather: listWeatherArray[]
    clouds: listCloudsObj;
    wind: listWindObj;
    visibility: number;
    pop: number;
    sys: listSysObj;
    dt_txt: string;
}

export interface listMainObj {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface listWeatherArray {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface listCloudsObj {
    all: number;
}

export interface listWindObj {
    speed: number;
    deg: number;
    gust: number;
}

export interface listSysObj {
    pod: string;
}

export interface cityObject {
    id: number;
    name: string;
    coord: coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface coord {
    lat: number;
    lon: number;
}