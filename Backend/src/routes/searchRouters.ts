import express, { Router } from 'express'
import { handleSearch, handleSuggections, takeSuggestionsFromDB } from '../controllers/searchController'

const router = express.Router()

router.use((req, res, next) => {
  console.log('req.method , req.url',req.method, req.url);
  next();
});

router.get('/search',handleSearch)
router.get('/takeSuggections',takeSuggestionsFromDB)
router.post('/suggest',handleSuggections)



export default router