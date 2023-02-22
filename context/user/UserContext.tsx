import { createContext } from 'react';
import { UserForm } from '../../interfaces';


interface ContextProps {
    isEditUser: boolean;

    //methods

    registerUser: (dataUser:UserForm) => Promise<{hasRegister:boolean; message: string; }>;
    editUser: (user: UserForm) => Promise<{message: string}>;
    

}


export const UserContext = createContext({} as ContextProps );