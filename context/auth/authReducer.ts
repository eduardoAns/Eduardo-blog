import { AuthState } from './';
import { User } from '../../interfaces';


type AuthActionType = 
   | { type: '[Auth] - Login', payload: User } 
   | { type: '[Auth] - Logout' } 
   | { type: '[Auth] - Autorization', payload:number}


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

   switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }

        case '[Auth] - Autorization':
            return {
                ...state,
                userId:action.payload
            }


       default:
          return state;
   }

}