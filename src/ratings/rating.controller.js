import { Rating } from "./rating.model.js";
import { Sequelize } from "sequelize";
import { Report } from "../reports/report.model.js";

export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAverageRatingByReport = async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            attributes: [
                'report_id',
                [Sequelize.fn('AVG', Sequelize.col('score')), 'average']
            ],
            include: [{
                model: Report,
                as: 'report',
                attributes: ['id', 'title', 'description']
            }],
            group: ['ratings.id', 'report.id'],
            raw: false,
            nest: true
        });

        res.json(ratings);

    } catch (error) {
        console.error("Error en getAverageRatingByReport:", error);
        res.status(500).json({ message: error.message });
    }
};