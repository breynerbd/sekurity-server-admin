import { Zone } from "./zone.model.js";

export const createZone = async (req, res) => {

    try {

        const zone = await Zone.create(req.body);

        res.status(201).json(zone);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getZones = async (req, res) => {

    const zones = await Zone.findAll();

    res.json(zones);
};

export const updateZone = async (req, res) => {

    const zone = await Zone.findByPk(req.params.id);

    if (!zone)
        return res.status(404).json({ message: "Zona no encontrada" });

    await zone.update(req.body);

    res.json(zone);
};

export const deleteZone = async (req, res) => {

    const zone = await Zone.findByPk(req.params.id);

    if (!zone)
        return res.status(404).json({ message: "Zona no encontrada" });

    await zone.destroy();

    res.json({ message: "Zona eliminada correctamente" });
};