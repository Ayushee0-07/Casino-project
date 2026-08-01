const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    return sequelize.define(
        "tournament_user",
        {
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            timestamps: false
        }
    );
};