const CompanyCtrl = require('../controllers/company');

var Symbols = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        newsymbol: newsymbol.bind(this), // use the bind function to access this.app
    };
}

// Events

async function newsymbol(anewsymbol) {
    // Broadcast message to all sockets
    console.log("new symbols", anewsymbol);
    let companyCreated = await CompanyCtrl.addCompany(anewsymbol);
    if (companyCreated) {
        console.log("send this symbols to everyone");
        this.socket.broadcast.emit('newsymbol', anewsymbol);
    } else {
        console.log("this symbols is already in data base");
    }
};

module.exports = Symbols;