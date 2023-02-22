import useSWR, { SWRConfiguration } from 'swr';
import { Blog, BlogFormulario } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());
const devUrl = "http://localhost:8080/api";
const prodUrl = "https://blogback-production.up.railway.app/api";

export const useBlogs = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<Blog[]>(prodUrl + url, config );

    return {
        blogs: data || [],
        isLoading: !error && !data,
        isError: error
    }

}

export const useBlog = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<Blog>(prodUrl + url, config );
    return {
        blogData: data,
        isLoading: !error && !data,
        isError: error
    }

}

