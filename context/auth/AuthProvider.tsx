import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';

import { User, UserPost } from '../../interfaces';
import router from 'next/router';
import blogApi  from '../../api/blogApi';

export interface AuthState {
    isLoggedIn: boolean;
    user?: User;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    
    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {

        const Authorization= Cookies.get('token')

        if ( !Authorization ) {
            return;
        }

        try {
            const { data } = await blogApi.get('/validate-token', {'headers':{'Authorization': Authorization}});
            const { token, user } = data;
            Cookies.set('token', token.jwt );
            dispatch({ type: '[Auth] - Login', payload: user });
            console.log(data)
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( correo: string, password: string ): Promise<boolean> => {
        

        try {
            const { data } = await blogApi.post('/login', { correo, password });

            const { token, user } = data;
            Cookies.set('token', token.jwt );
            dispatch({ type: '[Auth] - Login', payload: user });
            console.log(data)
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( dataUser:UserPost ): Promise<{hasRegister:boolean; message: string; }> => {
        try {
            const { data } = await blogApi.post('/usuario', dataUser);
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

        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('city');
        Cookies.remove('phone');
        Cookies.remove('token');
        router.reload();
        
        

    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};