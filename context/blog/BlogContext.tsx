import { createContext } from 'react';


interface ContextProps {
    prop1: boolean;
}


export const BlogContext = createContext({} as ContextProps );