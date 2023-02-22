import useSWR, { SWRConfiguration } from "swr";
import { Coment } from "../interfaces";


const devUrl = "http://localhost:8080/api";
const prodUrl = "https://blogback-production.up.railway.app/api";


export const useComent = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<Coment[]>(devUrl + url, config );

    return {
        coments: data || [],
        isLoading: !error && !data,
        isError: error
    }

}

