const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        "@components": "src/components",
        "@redux" : "src/redux",
        "@views": "src/views"
    })(config)
    return config
}