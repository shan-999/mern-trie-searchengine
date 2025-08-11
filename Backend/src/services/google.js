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
exports.searchGoogle = searchGoogle;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGEL_URL = process.env.GOOGEL_URL;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
function searchGoogle(term) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(GOOGEL_URL, GOOGLE_SEARCH_ENGINE_ID, GOOGLE_API_KEY);
            const res = yield axios_1.default.get(GOOGEL_URL, {
                params: {
                    key: GOOGLE_API_KEY,
                    cx: GOOGLE_SEARCH_ENGINE_ID,
                    q: term,
                },
            });
            if (res.data) {
                return res.data;
            }
        }
        catch (error) {
            console.log('got a error from serachGoogle', error);
        }
    });
}
