import { Router } from "express";
import {
    getUsers,
    getUserById,
    deactivateUser
} from "./user.controller.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id/deactivate", deactivateUser);

export default router;