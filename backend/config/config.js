const path = require('path')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'stockmarket',
        user: process.env.DB_USER || 'stockmarket',
        password: process.env.DB_PASS || 'stockmarket',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            operatorsAliases: Sequelize.Op,
            storage: path.resolve(__dirname, '../stockmarket.sqlite')
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}