var Symbols = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        newsymbol: newsymbol.bind(this), // use the bind function to access this.app
    };
}

// Events

function newsymbol(anewsymbol) {
    // Broadcast message to all sockets
    console.log("new symbols", anewsymbol);
    this.socket.broadcast.emit('newsymbol', anewsymbol);
};

module.exports = Symbols;