import User from '../models/user.js'

export const updateUser = async (req, res) => {
    const { stars, id, proof } = req.body

    if (stars === undefined || id === undefined || proof === undefined) {
        return res.status(400).json({ error: 'Stars, id and proof are required' })
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (user.proofs.find(item => item.id === proof.id)) return res.status(400).json({ error: 'Proof already added' })

        user.stars += stars
        user.proofs = user.proofs.concat(proof)


        await user.save()

        res.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ error: 'Server error' })
    }
}
