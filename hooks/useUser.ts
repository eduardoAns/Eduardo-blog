import useSWR, { SWRConfiguration } from 'swr';
import { User } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());
const devUrl = "http://localhost:8080/api";
const prodUrl = "https://blogback-production.up.railway.app/api";

export const useUser = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<User>(devUrl + url, config );

    return {
        user: data || undefined,
        isLoading: !error && !data,
        isError: error
    }

}