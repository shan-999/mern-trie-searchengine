import { Request, Response } from "express";
import { insertSearch, getSuggestions, initializeTrie } from "../services/trieService";
import { searchGoogle } from "../services/google";




export const handleSearch = async (req: Request, res: Response) => {
    const term  = req.query.q as string
    try {
        if (!term) res.status(400).json({ error: 'Missing serach term' })

        await insertSearch(term)
        const data = await searchGoogle(term)

        res.status(200).json({success:true,data})
    } catch (error) {
        res.status(500).json({error:'An unexpected error occurred. Please try again later.'})
    }
}


export const handleSuggections = async (req:Request, res:Response) => {
    const {prefix} = req.body
    try {
        const suggestions  = getSuggestions(prefix || '')
        res.status(200).json({success:true,suggestions})
    } catch (error) {
        res.status(500).json({error:'An unexpected error occurred. Please try again later.'})
    }
}


export const takeSuggestionsFromDB = async (req:Request, res:Response) => {
    try {
        const data = await initializeTrie()
        res.status(200).json({success:true, data})
    } catch (error) {
        res.status(500).json({error:'An unexpected error occurred. Please try again later.'})
    }
}