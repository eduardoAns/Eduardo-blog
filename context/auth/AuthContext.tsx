

import { createContext } from 'react';
import { User, UserPost } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: User;

    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (dataUser:UserPost) => Promise<{hasRegister:boolean; message: string; }>;
    logout: () => void
}


export const AuthContext = createContext({} as ContextProps );