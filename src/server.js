const WebSocket = require('ws');

class HollerServer {
    /**
     * Creates a Holler server using an existing Node HTTP server
     *
     * @param {http.Server} server - Node HTTP server to listen on
     */
    constructor(server) {
        this.socketServer = new WebSocket.Server({ server });
        this.socketServer.on('connection', this.onConnection.bind(this));
    }

    /**
     * Broadcasts a message to all connected clients
     *
     * @param {Object} message - Data to send to each client
     */
    broadcast(message) {
        this.socketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    /**
     * Extension point called when new clients connect
     *
     * @param {Object} socket - Socket object for new client
     */
    onConnection(socket) {
        socket.on('message', this.broadcast.bind(this));
        socket.on('error', this.onError.bind(this));
    }

    /**
     * Extension point called when an error occurs
     *
     * @param {Object} error - Error information
     */
    onError(error) {
        console.log(error);
    }
};

module.exports = HollerServer;
