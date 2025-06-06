import axios from "axios";
import useSWR from 'swr'

export const api = axios.create({
    baseURL: "",
});


export const useAxios = (url) => {
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data
        
    })
    // })
    return {data, mutate}
}

