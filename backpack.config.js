const path = require("path");

module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = './server/index.js';
        return config
    }
}
