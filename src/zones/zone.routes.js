import { Router } from "express";

import {
    createZone,
    getZones,
    updateZone,
    deleteZone
} from "./zone.controller.js";

const router = Router();

router.post("/", createZone);

router.get("/", getZones);

router.put("/:id", updateZone);

router.delete("/:id", deleteZone);

export default router;