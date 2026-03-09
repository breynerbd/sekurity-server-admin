import { User } from "../users/user.model.js";

export const syncUserFromAuth = async (req, res) => {
    try {

        const { auth_id, nombre, apellido, correo, telefono } = req.body;

        if (!auth_id) {
            return res.status(400).json({
                success: false,
                message: "auth_id es requerido"
            });
        }

        let user = await User.findOne({
            where: { auth_id }
        });

        if (!user) {
            user = await User.create({
                auth_id,
                nombre: nombre ?? "PENDIENTE",
                apellido: apellido ?? "PENDIENTE",
                correo: correo,
                dpi: "PENDIENTE",
                telefono: telefono ?? "PENDIENTE",
                direccion: "PENDIENTE",
                ingresos_mensuales: 0,
                role_id: 2
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};