import { User } from "./user.model.js";

export const getUsers = async (req, res) => {
    try {

        const users = await User.findAll();

        res.json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
};

export const deactivateUser = async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({
        isActive: false
    });

    res.json({ message: "Usuario desactivado correctamente", user });
};