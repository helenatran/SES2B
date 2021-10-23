function startWebSocketServer(io) {
  // Initialise routes
  require('./video')(io.of('/video'));
  require('./misconduct')(io.of('/misconduct'))
}

module.exports = startWebSocketServer;
