import User from '../models/user.js'

export const getRanking = async (req, res) => {
    try {
        const users = await User.find().sort({ stars: -1 }).select('username stars')
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
