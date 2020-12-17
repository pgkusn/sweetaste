const fs = require('fs');
const path = require('path');

module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'prod' ? '/sweetaste/' : '/',
    devServer: {
        https: true,
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        host: 'localhost'
    }
};
