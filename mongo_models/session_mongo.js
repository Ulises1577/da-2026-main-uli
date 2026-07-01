import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    authorizationToken: { type: String, required: true },
    open: { type: String, required: true },
    role: { type: String, required: true }
});

export default mongoose.model('session', sessionSchema);