"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const searchSchema = new mongoose_1.Schema({
    term: { type: String, required: true, unique: true }
});
exports.default = (0, mongoose_1.model)('Search', searchSchema);
