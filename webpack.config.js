const path = require('path');

// Our actual configuration is an object exported by this file.
module.exports = {
    entry: './client/scriptTagCode.js',

    mode: 'development',

    //watch: true,
    watchOptions: {
        aggregateTimeout: 200,
    },

    // The output object defines various things about the output bundle.
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js',
    },
};