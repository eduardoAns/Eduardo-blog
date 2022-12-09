import { createContext } from 'react';
import { Coment } from '../../interfaces';


interface ContextProps {
    isUpdateListComent: boolean;
    isChangeEditComment:boolean;
    isEditComment:boolean;
    IdClickComment:number;

    //methods
    postComment: (dataPost: Coment) => Promise<void>;
    getComents: () => Promise<Coment[]>;
    deleteComment: (idComment: number) => Promise<void>;
    setIsChangeEditComment: () => void;
    getIdClickComment: (idComment: number) => void;
    editComment: (comment: Coment) => Promise<void>;
}


export const ComentContext = createContext({} as ContextProps );