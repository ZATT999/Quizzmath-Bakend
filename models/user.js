import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stars: { type: Number, default: 0 },
    proofs: { type: Array, default: [] }
});

export default mongoose.model('User', userSchema);
