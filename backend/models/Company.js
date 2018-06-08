function trimSymbol(company, options) {
    company.symbol = company.trim(company.symbol);
    return company;
}

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        symbol: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: function () {
                return sequelize.NOW();
            }
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: null,
        }
    });

    Company.associate = function (models) {}

    return Company
}