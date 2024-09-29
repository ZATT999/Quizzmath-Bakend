import User from '../models/user.js';

export const getRanking = async (req, res) => {
    try {
        // Obtener usuarios ordenados por estrellas
        const users = await User.find().sort({ stars: -1 }).select('_id username stars');

        // Asignar posición a cada usuario y actualizar en la base de datos
        const updatePromises = users.map((user, index) => {
            user.position = index + 1; // Asignar posición
            return User.updateOne({ _id: user._id }, { position: user.position }); // Actualizar en la base de datos
        });

        await Promise.all(updatePromises); // Esperar a que todas las actualizaciones se completen

        // Retornar los usuarios con la nueva propiedad
        const updatedUsers = users.map(user => ({
            username: user.username,
            stars: user.stars,
            position: user.position
        }));

        res.json(updatedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
