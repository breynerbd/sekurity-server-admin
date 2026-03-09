import { Comment } from "./comment.model.js";
import { User } from "../users/user.model.js";

export const getComments = async (req, res) => {

    const comments = await Comment.findAll({
        include: [User]
    });

    res.json(comments);
};

export const deleteComment = async (req, res) => {

    const comment = await Comment.findByPk(req.params.id);

    if (!comment)
        return res.status(404).json({ message: "Comentario no encontrado" });

    await comment.destroy();

    res.json({ message: "Comentario eliminado correctamente" });
};