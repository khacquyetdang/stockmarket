const CompanyCtrl = require('../controllers/company');

var Symbols = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        newcompany: newcompany.bind(this), // use the bind function to access this.app
    };
}

// Events

async function newcompany(company) {
    // Broadcast message to all sockets
    console.log("newcompany", company);

    let companyCreated = await CompanyCtrl.addCompany(company.symbol, company.stockdaily,
        company.stockweekly, company.stockmonthly);
    if (companyCreated) {
        console.log("send this symbols to everyone");
        this.socket.broadcast.emit('newcompany', company);
    } else {
        console.log("this symbols is already in data base");
    }
};

module.exports = Symbols;