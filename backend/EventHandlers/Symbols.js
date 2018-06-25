const CompanyCtrl = require('../controllers/company');

var Symbols = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        newcompany: newcompany.bind(this), // use the bind function to access this.app
        removecompany: removecompany.bind(this)
    };
}

// Events


async function removecompany(companySymbol) {
    // Broadcast message to all sockets
    console.log("removecompany", companySymbol);

    let companyDeleted = await CompanyCtrl.removeCompany(companySymbol);
    if (companyDeleted) {
        console.log("send delete request to everyone");
        this.socket.broadcast.emit('removecompany', companySymbol);
    } else {
        console.log("Couldn't remove the company");
    }
};

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