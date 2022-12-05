import useSWR, { SWRConfiguration } from "swr";
import { Coment } from "../interfaces";





export const useComent = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<Coment[]>(`https://blogback-production.up.railway.app/api${ url }`, config );

    return {
        coments: data || [],
        isLoading: !error && !data,
        isError: error
    }

}

