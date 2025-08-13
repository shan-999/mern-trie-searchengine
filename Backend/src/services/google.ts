import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGEL_URL = process.env.GOOGEL_URL
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY



export async function searchGoogle(term: string) {
    try {
        const res = await axios.get(GOOGEL_URL as string, {
            params: {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_SEARCH_ENGINE_ID,
                q: term,
            },
        })

        if (res.data) {
            return res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                throw new Error("Google API rate limit exceeded. Please try again later.");
            }
            throw new Error(error.message); 
        }

        throw new Error(String(error));
    }
}