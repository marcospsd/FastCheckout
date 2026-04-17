import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios'


export const api = axios.create({
    baseURL: "",
    timeout: 15000,
})

export const service = axios.create({
    baseURL: "",
    timeout: 5000
})


export const useAxios = (url) => {
    //const { mutate } = useSWRConfig()
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);
        return response.data
        
    //  }, { refreshInterval: 10000 })
    })
    return {data, mutate}
}
