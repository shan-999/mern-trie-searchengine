import { Schema, model } from 'mongoose';

const searchSchema = new Schema({
    term: {type: String, required: true, unique: true   }
})

export default model('Search', searchSchema)