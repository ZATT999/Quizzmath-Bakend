import User from '../models/user.js';

export const getRanking = async (req, res) => {
    try {
        // Obtener usuarios ordenados por estrellas
        const users = await User.find().sort({ stars: -1 }).select('_id username stars');

        // Asignar posición a cada usuario
        const updatedUsers = users.map((user, index) => ({
            _id: user._id,
            username: user.username,
            stars: user.stars,
            position: index + 1
        }));

        // Crear un array de actualizaciones para todos los usuarios
        const updatePromises = updatedUsers.map(user => ({
            updateOne: {
                filter: { _id: user._id },
                update: { position: user.position }
            }
        }));

        // Realizar la actualización en la base de datos
        await User.bulkWrite(updatePromises);

        // Retornar los usuarios con la nueva propiedad
        res.json(updatedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el ranking' });
    }
};
