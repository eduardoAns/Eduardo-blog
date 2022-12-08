import Cookies from 'js-cookie';
import router from 'next/router';
import { FC, useEffect, useReducer, useState } from 'react';
import blogApi from '../../api/blogApi';
import { dataForm } from '../../components/coments/AddComent';
import { Coment, User } from '../../interfaces';
import { ComentContext, ComentReducer } from './';

export interface ComentState {
    isComment: boolean;
    isEditComment: boolean;
    IdClickComment:number
}

const COMENT_INITIAL_STATE: ComentState = {
    isComment: false,
    isEditComment: false,
    IdClickComment:0,
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

          try {
            await blogApi.post('/comentario', dataPost);
            console.log('comentario creado')
      
          } catch (error) {
            console.log(error)
          }

          dispatch({ type: '[COMMENT] - commentListChange' });

    }

    const deleteComment = async (idComment:number) => {

          try {
            await blogApi.delete(`/comentario/${idComment}`);
            console.log('comentario Eliminado')
      
          } catch (error) {
            console.log(error)
          }

        dispatch({ type: '[COMMENT] - commentListChange' });
    }

    const setIsEditComment = () => {
      dispatch({ type: '[COMMENT] - commentEditChange' });
    }

    const getIdClickComment = (idComment:number) => {
        const itemBox = document.getElementById(idComment.toString())
        const id = itemBox?.getAttribute('id')
        dispatch({ type: '[COMMENT] - getIdClickComment', payload:Number(id)});
    }

    const editComment = async (comment:Coment) => {

      try {
        await blogApi.put('/comentario', comment);
        console.log('comentario creado')
  
      } catch (error) {
        console.log(error)
      }

    dispatch({ type: '[COMMENT] - commentListChange' });
    dispatch({ type: '[COMMENT] - commentEditChange' });
    }
    
    return (
        <ComentContext.Provider value={{
            ...state,

            //methods
            postComment,
            getComents,
            deleteComment,
            setIsEditComment,
            getIdClickComment,
            editComment,
        }}>
           { children }
        </ComentContext.Provider>
    );
};