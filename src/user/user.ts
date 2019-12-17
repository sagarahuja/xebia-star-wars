import axios from '../services/axios';

export interface User {
    username: string;
    password: string;
}

export const getStarWarsUsersDetails = () => {
     return new Promise((resolve, reject) => {
        (async () => {
            try {
                const response = await axios.get(
                    `people/?format=json`,
                );
                resolve(parseUserResponse(response.data.results));
            } catch (error) {
                reject(error);
            }
        })();
    });
};
export const parseUserResponse = (response: any): User[] => {
    const user: User[] = [];
    response.forEach((starWar: any) => {
        user.push({ username: starWar.name, password: starWar.birth_year })
    });
    return user;
}