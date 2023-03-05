const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) { 
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:10101',
        changeOrigin: true,
    }));
};
