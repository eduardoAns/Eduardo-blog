import { createContext } from 'react';
import { Coment } from '../../interfaces';


interface ContextProps {
    isComment: boolean;

    //methods
    postComment: (dataPost: Coment) => Promise<void>;
    getComents: () => Promise<Coment[]>
}


export const ComentContext = createContext({} as ContextProps );