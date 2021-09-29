const { createProxyMiddleware } = require("http-proxy-middleware");

// `proxy` field in package.json does not work for WebSocket connections, so we need to manually set up a proxy
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/socket.io/", {
      target: "http://localhost:3001/",
      ws: true,
    })
  );
};