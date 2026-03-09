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

const router = Router();

// Sin validación (a menos que añadas paginación)
router.get("/", getUsers);

// Con validación de ID en el parámetro
router.get("/:id", validateGetUserById, getUserById);

// Con validación de ID para desactivar
router.patch("/:id/deactivate", validateDeactivateUser, deactivateUser);

export default router;