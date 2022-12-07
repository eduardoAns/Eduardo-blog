import { FC, useReducer, useEffect, useState } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';

import { User, UserPost } from '../../interfaces';
import router from 'next/router';
import blogApi  from '../../api/blogApi';

export interface AuthState {
    isLoggedIn: boolean;
    user?: User;
    userId:number;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    userId:0
}


export const AuthProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    useEffect(() => {
        checkToken();
        userAuthorization()
    }, [])
    

    const userAuthorization = async (): Promise<{idUsuario:number}> =>{
        const Authorization= Cookies.get('token')

        let idUsuario:number = 0

        if ( Authorization ) {
            try {
                const { data } = await blogApi.get('/validtoken', {'headers':{'Authorization': Authorization}});
                const user:User = data;
                idUsuario = user.id
                dispatch({ type: '[Auth] - Autorization', payload: idUsuario });
            } catch (error) {
                dispatch({ type: '[Auth] - Autorization', payload: idUsuario });
                console.log(error)
            }
        };

        return {idUsuario}
    }
    

    const checkToken = async() => {

        const Authorization= Cookies.get('token')
        if ( !Authorization ) {
            return;
        }

        try {
            const { data } = await blogApi.get('/validate-token', {'headers':{'Authorization': Authorization}});
            const user = data;
            Cookies.set('token', user.token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }


    const loginUser = async( email: string, password: string ): Promise<boolean> => {
        
        try {
            const { data } = await blogApi.post('/login', { email, password });
            const user = data;
            Cookies.set('token', user.token );
            dispatch({ type: '[Auth] - Login', payload: user });
            
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }


    const registerUser = async( dataUser:UserPost ): Promise<{hasRegister:boolean; message: string; }> => {
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

    const logout = () => {

        Cookies.remove('token');
        router.reload();
        
        

    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            userAuthorization,
            loginUser,
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};