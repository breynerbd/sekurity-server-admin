import { Router } from "express";
import {
    getUsers,
    getUserById,
    deactivateUser
} from "./user.controller.js";
import { 
    validateGetUserById, 
    validateDeactivateUser 
} from "../../middlewares/user-validators.js"; 
import { authenticateUser } from "../../middlewares/authenticateUser.js";

const router = Router();

// Todas las rutas quedan protegidas bajo autenticación de token JWT
router.get("/", authenticateUser, getUsers);

router.get("/:id", authenticateUser, validateGetUserById, getUserById);

router.patch("/:id/deactivate", authenticateUser, validateDeactivateUser, deactivateUser);

export default router;