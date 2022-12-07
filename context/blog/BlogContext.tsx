import { createContext } from 'react';
import { Blog } from '../../interfaces';


interface ContextProps {
    isSaving: boolean;

    //methods

    postBlog: (blog: Blog) => Promise<void>;
    deleteBlogImage: (imageId: String) => Promise<void>;
    getUrlImage: (url: string) => void
}


export const BlogContext = createContext({} as ContextProps );