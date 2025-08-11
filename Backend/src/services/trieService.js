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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestions = exports.insertSearch = exports.initializeTrie = void 0;
const search_1 = __importDefault(require("../models/search"));
const Trie_1 = require("../trie/Trie");
const trie = new Trie_1.Trie();
const initializeTrie = () => __awaiter(void 0, void 0, void 0, function* () {
    const searches = yield search_1.default.find();
    searches.forEach(({ term }) => trie.insert(term));
});
exports.initializeTrie = initializeTrie;
const insertSearch = (term) => __awaiter(void 0, void 0, void 0, function* () {
    yield search_1.default.updateOne({ term }, { term }, { upsert: true });
    trie.insert(term);
});
exports.insertSearch = insertSearch;
const getSuggestions = (prefix) => {
    return trie.autoCompleate(prefix);
};
exports.getSuggestions = getSuggestions;
