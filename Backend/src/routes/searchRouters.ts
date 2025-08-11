import express, { Router } from 'express'
import { handleSearch, handleSuggections, takeSuggestionsFromDB } from '../controllers/searchController'

const router = express.Router()

router.get('/',(req,res) => {
    console.log(req.url)
})

router.get('/search',handleSearch)
router.get('/takeSuggections',takeSuggestionsFromDB)
router.post('/suggest',handleSuggections)



export default router