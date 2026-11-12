import { AccessToken, Credentials, User, UserSessionToken } from "./user.resource";
import jwt from 'jwt-decode'

class AuthService {
    baseURL: string = 'http://localhost:8080/v1/users'
    static AUTH_PARAM: string = '_auth';

    async authenticate(credentials: Credentials) : Promise<AccessToken>{
        const response = await fetch(this.baseURL + "/auth", {
            method:'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status == 401){
            throw new Error('User or password are incorrect!');
        }

        return await response.json();
    }

    async save(user: User): Promise<void>{
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log("Response Auth.save: ",response);

        if(response.status == 409){
            const responseError = await response.json();
            throw new Error(responseError.error);
        }
    }

    initSession(token: AccessToken){
        if(token.accessToken){
            const decodeToken: any = jwt(token.accessToken);

            console.log("Decode token: ", decodeToken);

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodeToken.sub,
                name: decodeToken.name,
                expiration: decodeToken.exp
            }

            this.setUserSession(userSessionToken)

        }
    }

    setUserSession(userSessionToken: UserSessionToken){
        localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
    }
}

export const useAuth = () => new AuthService();