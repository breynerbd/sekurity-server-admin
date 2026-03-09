import { DataTypes } from "sequelize";
import { db } from "../../configs/db.js";

export const Report = db.define("reports", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    incident_type: {
        type: DataTypes.STRING
    },

    severity_level: {
        type: DataTypes.STRING,
        defaultValue: "MEDIUM"
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE"
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    zone_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: true
});