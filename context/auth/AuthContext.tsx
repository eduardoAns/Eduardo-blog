

import { createContext } from 'react';
import { User, UserForm } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: User;
    userId:number;

    userAuthorization:() => Promise<{idUsuario: number;}>;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (dataUser:UserForm) => Promise<{hasRegister:boolean; message: string; }>;
    logout: () => void
}


export const AuthContext = createContext({} as ContextProps );