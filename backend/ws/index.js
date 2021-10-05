function startWebSocketServer(io) {
  // Initialise routes
  require('./video')(io.of('/video'));
}

module.exports = startWebSocketServer;