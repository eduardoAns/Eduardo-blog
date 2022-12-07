import router from 'next/router';
import { FC, useReducer } from 'react';
import blogApi from '../../api/blogApi';
import { Blog } from '../../interfaces';
import { BlogContext, BlogReducer } from './';

export interface BlogState {
    isSaving: boolean;
}


const BLOG_INITIAL_STATE: BlogState = {
    isSaving: false,
}


export const BlogProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( BlogReducer, BLOG_INITIAL_STATE );

    const postBlog = async (blog:Blog) => {
        dispatch({ type: 'Blog - isSaving' });
        try {
            const { data } = await blogApi({
                url: '/post',
                method: blog.id ? 'PUT': 'POST',  // si tenemos un id, entonces actualizar, si no crear
                data: blog
            });
            console.log(blog?.id ? 'actualizado' + data : 'creado' + data);
            if(blog.id){
                router.reload();
            }
            router.replace('/user/blogs/')
            

        } catch (error) {
            console.log(error);
            dispatch({ type: 'Blog - isSaving' });
        }
    }

    const deleteBlogImage = async (imageId:String) => {
        try {
            await blogApi.delete(`/image/cloud/${imageId}`);

        } catch (error) {
            console.log(error);
        }
    };

    const getUrlImage = (url:string) => {
        console.log("copiar url:", url)
        let dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    
    return (
        <BlogContext.Provider value={{
            ...state,

            //methods
            postBlog,
            deleteBlogImage,
            getUrlImage
        }}>
           { children }
        </BlogContext.Provider>
    );
};