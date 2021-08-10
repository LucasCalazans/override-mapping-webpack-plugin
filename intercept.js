const overrideMappingPlugin = require('./index');

module.exports = targets => {
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        compiler.options.plugins.push(new overrideMappingPlugin());
    });
};
