import axios from '../services/axios';

export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string;
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export const getStarWarsPlanetsDetails = () => {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                const response = await axios.get(
                    `planets/?format=json`,
                );
                resolve(parsePlanetResponse(response.data.results));
            } catch (error) {
                reject(error);
            }
        })();
    });
};
export const parsePlanetResponse = (response: any): Planet[] => {
    const planets: Planet[] = [];
    response.forEach((planet: any) => {
        if(planet.population && isNaN(planet.population)){
            planet.population = '0';
        }
        planets.push(planet as Planet)
    });
    return planets.sort((planet1: Planet, planet2: Planet) => {
        if (parseInt(planet1.population) < parseInt(planet2.population)) {
          return -1;
        } else if (parseInt(planet1.population) > parseInt(planet2.population)) {
          return 1;
        } else {
          return 0;
        }
      });
}