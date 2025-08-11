import SearchModel from '../models/search'
import { Trie } from '../trie/Trie'

const trie = new Trie()


export const initializeTrie = async () => {
    const searches = await SearchModel.find()
    searches.forEach(({term}) => trie.insert(term))
}


export const insertSearch = async (term:string) => {
    await SearchModel.updateOne({term}, {term}, {upsert:true})
    trie.insert(term)
}


export const getSuggestions = (prefix:string):string[] => {
    return trie.autoCompleate(prefix)
}