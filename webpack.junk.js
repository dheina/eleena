const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils')
        }
    }
};
