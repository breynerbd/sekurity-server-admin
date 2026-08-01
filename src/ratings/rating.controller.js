import { Rating } from "./rating.model.js";
import { Sequelize } from "sequelize";
import { Report } from "../reports/report.model.js";

export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            attributes: [
                'report_id',
                [Sequelize.fn('AVG', Sequelize.col('score')), 'average'],
                [Sequelize.fn('COUNT', Sequelize.col('ratings_v2.id')), 'totalRatings'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN score = 5 THEN 1 ELSE 0 END')), 'count5'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN score = 4 THEN 1 ELSE 0 END')), 'count4'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN score = 3 THEN 1 ELSE 0 END')), 'count3'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN score = 2 THEN 1 ELSE 0 END')), 'count2'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN score = 1 THEN 1 ELSE 0 END')), 'count1'],
            ],
            include: [{
                model: Report,
                as: 'report',
                attributes: ['id', 'title', 'description', 'zone_id']
            }],
            group: [
                'ratings_v2.report_id',
                'report.id',
                'report.title',
                'report.description',
                'report.zone_id'
            ],
            raw: false,
            nest: true
        });

        return res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
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
            group: ['Rating.report_id', 'report.id', 'report.title', 'report.description'],
            raw: false,
            nest: true
        });

        res.json(ratings);

    } catch (error) {
        console.error("Error en getAverageRatingByReport:", error);
        res.status(500).json({ message: error.message });
    }
};