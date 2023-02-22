import { createContext } from 'react';
import { Coment } from '../../interfaces';


interface ContextProps {
    isUpdateListComent: boolean;
    isChangeEditComment:boolean;
    IdClickComment:number;

    //methods
    postComment: (dataPost: Coment) => Promise<{message: string}>;
    getComents: () => Promise<Coment[]>;
    deleteComment: (idComment: number) => Promise<{message: string}>
    setIsChangeEditComment: () => void;
    getIdClickComment: (idComment: number) => void;
    editComment: (comment: Coment) => Promise<{message: string}>;
}


export const ComentContext = createContext({} as ContextProps );