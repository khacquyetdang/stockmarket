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
        stockdaily: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        stockweekly: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        stockmonthly: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        }
    }, {
        hooks: {
            beforeUpdate: trimSymbol
        }
    });

    Company.associate = function (models) {}

    return Company
}