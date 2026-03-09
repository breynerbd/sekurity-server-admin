import { Router } from "express";

import {
    getComments,
    deleteComment
} from "./comment.controller.js";

const router = Router();

router.get("/", getComments);

router.delete("/:id", deleteComment);

export default router;