import { Report } from "./report.model.js";
import { User } from "../users/user.model.js";
import { Zone } from "../zones/zone.model.js";

export const getReports = async (req, res) => {

    const reports = await Report.findAll({
        include: [User, Zone]
    });

    res.json(reports);
};

export const getReportById = async (req, res) => {

    const report = await Report.findByPk(req.params.id, {
        include: [User, Zone]
    });

    if (!report)
        return res.status(404).json({ message: "Reporte no encontrado" });

    res.json(report);
};

export const updateReportStatus = async (req, res) => {

    const report = await Report.findByPk(req.params.id);

    if (!report)
        return res.status(404).json({ message: "Reporte no encontrado" });

    await report.update({
        status: req.body.status
    });

    res.json(report);
};

export const deleteReport = async (req, res) => {

    const report = await Report.findByPk(req.params.id);

    if (!report)
        return res.status(404).json({ message: "Reporte no encontrado" });

    await report.destroy();

    res.json({ message: "Reporte eliminado correctamente" });
};