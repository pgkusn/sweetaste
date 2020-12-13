const fs = require('fs');
const path = require('path');

module.exports = {
    lintOnSave: false,
    devServer: {
        https: true,
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        host: 'localhost'
    }
};
