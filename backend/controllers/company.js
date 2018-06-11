const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const {
    Company
} = require('../models');

const Op = Sequelize.Op;
/**
 * return 5 last company symbol
 */
exports.list = function (req, res) {
    Company.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(companies => {
        res.status(HttpStatus.OK).send({
            companies: companies
        });
    });
}

exports.addCompany = async function (asymbol) {
    const companies = await Company.findAll({
        where: {
            symbol: asymbol
        }
    });
    console.log('company found', companies);
    if (companies && companies.length > 0) {
        return false;
    }
    const company = await Company.create({
        symbol: asymbol
    });
    console.log('company created', company);
    return true;
}