import { Comment } from "./comment.model.js";
import { User } from "../users/user.model.js";
import { Report } from "../reports/report.model.js";

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                User,
                Report
            ]
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los comentarios", error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment)
            return res.status(404).json({ message: "Comentario no encontrado" });

        await comment.destroy();

        res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el comentario", error: error.message });
    }
};