const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/',
        createProxyMiddleware({
        target: 'https://eduket1-project1008.koyeb.app/',
        changeOrigin: true,
        ws: false,
        })
    );
};