import useSWR, { SWRConfiguration } from 'swr';
import { User } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useUser = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<User>(`https://blogback-production.up.railway.app/api${ url }`, config );

    return {
        user: data || undefined,
        isLoading: !error && !data,
        isError: error
    }

}