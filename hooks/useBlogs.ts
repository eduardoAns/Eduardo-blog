import useSWR, { SWRConfiguration } from 'swr';
import { Blog } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useBlogs = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<Blog[]>(`https://blogback-production.up.railway.app/api${ url }`, config );

    return {
        blogs: data || [],
        isLoading: !error && !data,
        isError: error
    }

}