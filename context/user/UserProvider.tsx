import { FC, useReducer } from 'react';
import blogApi from '../../api/blogApi';
import { UserForm } from '../../interfaces';
import { UserContext, userReducer } from './';

export interface UserState {
    isEditUser: boolean;
}


const USER_INITIAL_STATE: UserState = {
    isEditUser: false,
}


export const UserProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( userReducer, USER_INITIAL_STATE );

    const registerUser = async( dataUser:UserForm ): Promise<{hasRegister:boolean; message: string; }> => {

        try {
            await blogApi.post('/usuario', dataUser);
            return {
                hasRegister:true,
                message: 'Usuario creado exitosamente!'!
            }

        } catch (error) {
            return {
                hasRegister:false,
                message: 'Correo en uso, intente con otro'
            }
        }
    }

    const editUser = async ( user:UserForm ):Promise<{message: string}> => {
        try {
            await blogApi.put('/usuario', user);
            dispatch({ type: '[USER] - editUser' });
            return {
                message:'Usuario editado '
            }

        } catch (error) {
            console.log(error);
            return {
                message:'Error al editar usuario'
              }
        }
    }
    
    
    return (
        <UserContext.Provider value={{
            ...state,

            //methods
            registerUser,
            editUser
        }}>
           { children }
        </UserContext.Provider>
    );
};