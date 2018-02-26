const path = require("path");

module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = './server/index.js';
        // config.resolve.alias =  config.resolve.alias || {};
        // config.resolve.alias["axi"] = "./client/plugins/axios";
        return config
    }
}
