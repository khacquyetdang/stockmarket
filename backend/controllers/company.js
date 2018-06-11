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
        companies = companies.map(company => {
            company = company.dataValues;
            company.stockdaily = JSON.parse(company.stockdaily);
            company.stockweekly = JSON.parse(company.stockweekly);
            company.stockmonthly = JSON.parse(company.stockmonthly);
            return company;
        })
        res.status(HttpStatus.OK).send({
            companies: companies
        });
    });
}

exports.addCompany = async function (asymbol, stockdaily, stockweekly, stockmonthly) {
    const companies = await Company.findAll({
        where: {
            symbol: asymbol
        }
    });
    console.log('company found', companies);
    if (companies && companies.length > 0) {
        // update
        let company = await Company.update({
            stockdaily: JSON.stringify(stockdaily),
            stockweekly: JSON.stringify(stockweekly),
            stockmonthly: JSON.stringify(stockmonthly)
        }, {
            where: {
                symbol: asymbol
            }
        });
        console.log('company created', company);
        return false;
    }
    let company = await Company.create({
        symbol: asymbol,
        stockdaily: JSON.stringify(stockdaily),
        stockweekly: JSON.stringify(stockweekly),
        stockmonthly: JSON.stringify(stockmonthly)
    });
    console.log('company created', company);
    return true;
}