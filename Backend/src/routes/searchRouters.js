"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    console.log(req.url);
});
router.get('/search', searchController_1.handleSearch);
router.get('/takeSuggections', searchController_1.takeSuggestionsFromDB);
router.post('/suggest', searchController_1.handleSuggections);
exports.default = router;
