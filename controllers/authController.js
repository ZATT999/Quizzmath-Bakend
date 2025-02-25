import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'El usuario ya está registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, stars: 0, position: 0, grade: 0, role: 'Primaria', avatar: 'https://avatars.dicebear.com/api/bottts/1.svg', email: username });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Se requieren usuario y contraseña' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'El usuario no existe' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const authenticateToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const me = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const user = await User.findById(req.user.id).select('username stars proofs position grade role avatar email');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({
            proofs: user.proofs,
            id: user.id,
            username: user.username,
            stars: user.stars,
            position: user.position,
            grade: user.grade,
            role: user.role,
            avatar: `https://ui-avatars.com/api/?name=${user.username}&background=random&color=random&size=128`,
            // email: user.email
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const getRanking = async (req, res) => {
    try {
        // Obtener usuarios ordenados por estrellas
        const users = await User.find().sort({ stars: -1 }).select('_id username stars avatar');

        // Asignar posición a cada usuario
        const updatedUsers = users.map((user, index) => ({
            _id: user._id,
            username: user.username,
            stars: user.stars,
            position: index + 1,
            avatar: user.avatar
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
