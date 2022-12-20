
import { FC, useEffect, useReducer, useState } from 'react';
import blogApi from '../../api/blogApi';
import { dataForm } from '../../components/coments/AddComent';
import { Coment, User } from '../../interfaces';
import { ComentContext, ComentReducer } from './';

export interface ComentState {
    isUpdateListComent: boolean;
    isChangeEditComment: boolean;
    isEditComment:boolean;
    IdClickComment:number
}

const COMENT_INITIAL_STATE: ComentState = {
    isUpdateListComent: false,
    isChangeEditComment: false,
    isEditComment:false,
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

          dispatch({ type: '[COMMENT] - updateListComment' });

    }

    const deleteComment = async (idComment:number) => {

          try {
            await blogApi.delete(`/comentario/${idComment}`);
            console.log('comentario Eliminado')
      
          } catch (error) {
            console.log(error)
          }

        dispatch({ type: '[COMMENT] - updateListComment' });
    }

    const setIsChangeEditComment = () => {
      dispatch({ type: '[COMMENT] - changeEditComment' });
    }

    const getIdClickComment = (idComment:number) => {
        const itemBox = document.getElementById(idComment.toString())
        const id = itemBox?.getAttribute('id')
        dispatch({ type: '[COMMENT] - getIdClickComment', payload:Number(id)});
    }

    const editComment = async (comment:Coment) => {

      try {
        await blogApi.put('/comentario', comment);
        console.log('comentario Editado')
  
      } catch (error) {
        console.log(error)
      }

      dispatch({ type: '[COMMENT] - updateListComment' });
      dispatch({ type: '[COMMENT] - changeEditComment' });
      dispatch({ type: '[COMMENT] - editComment' });

    }
    
    return (
        <ComentContext.Provider value={{
            ...state,

            //methods
            postComment,
            getComents,
            deleteComment,
            setIsChangeEditComment,
            getIdClickComment,
            editComment,
        }}>
           { children }
        </ComentContext.Provider>
    );
};