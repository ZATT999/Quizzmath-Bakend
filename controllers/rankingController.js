import User from '../models/user.js';

export const getRanking = async (req, res) => {
    try {
        const users = await User.find().sort({ stars: -1 }).select('username stars');
        
        // Asignar posición a cada usuario
        const rankedUsers = users.map((user, index) => ({
            username: user.username,
            stars: user.stars,
            position: index + 1 // la posición comienza desde 1
        }));

        res.json(rankedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
