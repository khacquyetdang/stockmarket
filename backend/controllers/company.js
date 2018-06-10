const Sequelize = require('sequelize');
const {
    Company
} = require('../models');

const Op = Sequelize.Op;
module.exports = {
    /**
     * return 5 last company symbol
     */
    list: function (req, res) {
        Company.findAll({
            order: 'createdAt DESC'
        }).then(companies => {
            req.send({
                companies: companies
            });
        });
    },
    addCompany: async function (asymbol) {
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
}