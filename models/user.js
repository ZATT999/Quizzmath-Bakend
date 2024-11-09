import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stars: { type: Number, default: 0 },
    proofs: { type: Array, default: [] },
    position: { type: Number, default: 0 },
    grade: { type: Number, default: 0 },
    role: { type: String, default: 'Primaria' },
    avatar: { type: String, default: 'https://avatars.dicebear.com/api/bottts/1.svg' },
    email: { type: String, required: true, unique: true },

});

const User = mongoose.model('User', userSchema);
export default User;
