
import { FC, useReducer } from 'react';
import blogApi from '../../api/blogApi';
import { Coment, User } from '../../interfaces';
import { ComentContext, ComentReducer } from './';

export interface ComentState {
    isUpdateListComent: boolean;
    isChangeEditComment: boolean;
    IdClickComment:number
}

const COMENT_INITIAL_STATE: ComentState = {
    isUpdateListComent: false,
    isChangeEditComment: false,
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
    
    const postComment = async (dataPost:Coment):Promise<{message: string}> => {

          try {
            await blogApi.post('/comentario', dataPost);
            dispatch({ type: '[COMMENT] - updateListComment' });
            return {
              message:'comentario agregado '
            }
      
          } catch (error) {
            console.log(error)
            return {
              message:'error al agregar comentario'
            }
          }


    }

    const deleteComment = async (idComment:number) => {

          try {
            await blogApi.delete(`/comentario/${idComment}`);
            dispatch({ type: '[COMMENT] - updateListComment' });

          } catch (error) {
            console.log(error)
          }

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
        dispatch({ type: '[COMMENT] - updateListComment' });
        dispatch({ type: '[COMMENT] - changeEditComment' });
  
      } catch (error) {
        console.log(error)
      }

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