import { Rating } from "./rating.model.js";
import { Sequelize } from "sequelize";
import { Report } from "../reports/report.model.js";

export const getRatings = async (req, res) => {

    const ratings = await Rating.findAll();

    res.json(ratings);
};


//promedio de ratings por reporte
export const getAverageRatingByReport = async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            attributes: [
                'report_id',
                [Sequelize.fn('AVG', Sequelize.col('score')), 'average_rating']
            ],
            include: [{
                model: Report,
                attributes: ['id', 'title', 'description']
            }],
            group: ['report_id', 'report.id']
        });

        res.json(ratings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};