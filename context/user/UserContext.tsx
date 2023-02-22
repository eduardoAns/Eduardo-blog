import { createContext } from 'react';
import { userCreateForm, UserForm } from '../../interfaces';


interface ContextProps {
    isEditUser: boolean;

    //methods

    registerUser: (dataUser:userCreateForm) => Promise<{hasRegister:boolean; message: string; }>;
    editUser: (user: UserForm) => Promise<{message: string}>;
    

}


export const UserContext = createContext({} as ContextProps );