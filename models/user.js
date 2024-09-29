import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stars: { type: Number, default: 0 },
    proofs: { type: Array, default: [] },
    position: { type: Number, default: 0 } // Asegúrate de que esta línea esté incluida
});

const User = mongoose.model('User', userSchema);
export default User;
