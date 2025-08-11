"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeSuggestionsFromDB = exports.handleSuggections = exports.handleSearch = void 0;
const trieService_1 = require("../services/trieService");
const google_1 = require("../services/google");
const handleSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const term = req.query.q;
    try {
        if (!term)
            res.status(400).json({ error: 'Missing serach term' });
        yield (0, trieService_1.insertSearch)(term);
        const data = yield (0, google_1.searchGoogle)(term);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
});
exports.handleSearch = handleSearch;
const handleSuggections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prefix } = req.body;
    try {
        const suggestions = (0, trieService_1.getSuggestions)(prefix || '');
        res.status(200).json({ success: true, suggestions });
    }
    catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
});
exports.handleSuggections = handleSuggections;
const takeSuggestionsFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, trieService_1.initializeTrie)();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
});
exports.takeSuggestionsFromDB = takeSuggestionsFromDB;
