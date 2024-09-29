import User from '../models/user.js';

export const getRanking = async (req, res) => {
    try {
        // Obtener usuarios ordenados por estrellas
        const users = await User.find().sort({ stars: -1 }).select('_id username stars');

        // Asignar posición a cada usuario y actualizar en la base de datos
        const updatePromises = users.map((user, index) => {
            const position = index + 1; // Calcular posición
            return User.updateOne({ _id: user._id }, { position }); // Actualizar en la base de datos
        });

        // Esperar a que todas las actualizaciones se completen
        await Promise.all(updatePromises);

        // Obtener nuevamente los usuarios para devolverlos con la posición actualizada
        const updatedUsers = await User.find().sort({ stars: -1 }).select('username stars position');

        res.json(updatedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
