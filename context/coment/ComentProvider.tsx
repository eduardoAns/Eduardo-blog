import Cookies from 'js-cookie';
import router from 'next/router';
import { FC, useEffect, useReducer, useState } from 'react';
import blogApi from '../../api/blogApi';
import { dataForm } from '../../components/coments/AddComent';
import { Coment, User } from '../../interfaces';
import { ComentContext, ComentReducer } from './';

export interface ComentState {
    isComment: boolean;
}

const COMENT_INITIAL_STATE: ComentState = {
    isComment: false,
}


export const ComentProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( ComentReducer, COMENT_INITIAL_STATE );

    const getComents = async ():Promise<Coment[]> =>{

        let coments:Coment[] = []

        try {
            const {data} = await blogApi('/comentario')
            coments = data
        } catch (error) {
            console.log(error)
        }

        return coments
    }
    
    const postComment = async (dataPost:Coment) => {
        dispatch({ type: '[COMMENT] - resetIsComment' });

          try {
            await blogApi.post('/comentario', dataPost);
            console.log('comentario creado')
      
          } catch (error) {
            console.log(error)
          }

        dispatch({ type: '[COMMENT] - postComment' });
    }
    
    return (
        <ComentContext.Provider value={{
            ...state,

            //methods
            postComment,
            getComents
        }}>
           { children }
        </ComentContext.Provider>
    );
};