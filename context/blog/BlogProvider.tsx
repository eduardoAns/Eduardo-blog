import { FC, useReducer } from 'react';
import { BlogContext, BlogReducer } from './';

export interface BlogState {
    prop1: boolean;
}


const Blog_INITIAL_STATE: BlogState = {
    prop1: false,
}


export const BlogProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( BlogReducer, Blog_INITIAL_STATE );
    
    return (
        <BlogContext.Provider value={{
            ...state
        }}>
           { children }
        </BlogContext.Provider>
    );
};