import axiosInstence from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";


export const getSearchResult = async (term: string) => {
    
    const res = await axiosInstence.get(ENDPOINTS.SEARCH,{
        params:{q:term}
    })
    
    return res
} 

export const getSuggestions = async (prefix:string) => {
    const res = await axiosInstence.post(ENDPOINTS.GETSUGGECTION,{prefix})
    return res
}


export const initializeTrie = async () => {
    await axiosInstence.get(ENDPOINTS.INITIALIZETRIE)   
}