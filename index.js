const path = require('path');
const glob = require('glob');
const fs = require('fs');

const OVERRIDE_FOLDER_PATH = './src/override';

module.exports = class PWAStudioOverridePlugin {
    constructor(overrideRootPath = OVERRIDE_FOLDER_PATH) {
        this.name = 'OverrideMappingPlugin';
        this.moduleOverrideMap = this.getFilePaths(overrideRootPath);
    }

    getFilePaths(overrideRootPath) {
        const getParsedRootPath = (root) => {
            return root.replace(`${overrideRootPath}/`, '');
        }

        const getFiles = (dir, files_) => {
            files_ = files_ || {};
            const files = fs.readdirSync(dir);
            for (const i in files){
                const name = dir + '/' + files[i];
                if (fs.statSync(name).isDirectory()){
                    getFiles(name, files_);
                } else {
                    const parsedPath = getParsedRootPath(dir) + '/' + files[i];
                    files_[parsedPath] = dir + '/' + files[i];
                }
            }
            return files_;
        }

        return getFiles(overrideRootPath);
    }

    requireResolveIfCan(id, options = undefined) {
        try {
            return require.resolve(id, options);
        } catch (e) {
            return undefined;
        }
    }

    resolveModulePath(context, request) {
        const filePathWithoutExtension = path.resolve(context, request);
        const files = glob.sync(`${filePathWithoutExtension}@(|.*)`);
        if (files.length === 0) {
            throw new Error(`There is no file '${filePathWithoutExtension}'`);
        }

        if (files.length > 1) {
            throw new Error(
                `There is more than one file '${filePathWithoutExtension}'`
            );
        }

        return require.resolve(files[0]);
    }

    resolveModuleOverrideMap(context, map) {
        return Object.keys(map).reduce(
            (result, x) => ({
                ...result,
                [require.resolve(x)]:
                this.requireResolveIfCan(map[x]) ||
                this.resolveModulePath(context, map[x])
            }),
            {}
        );
    }

    apply(compiler) {
        if (Object.keys(this.moduleOverrideMap).length === 0) {
            return;
        }

        const moduleMap = this.resolveModuleOverrideMap(
            compiler.context,
            this.moduleOverrideMap
        );

        compiler.hooks.normalModuleFactory.tap(this.name, nmf => {
            nmf.hooks.beforeResolve.tap(this.name, resolve => {
                if (!resolve) {
                    return;
                }

                const moduleToReplace = this.requireResolveIfCan(
                    resolve.request,
                    { paths: [resolve.context] }
                );

                if (moduleToReplace && moduleMap[moduleToReplace]) {
                    resolve.request = moduleMap[moduleToReplace];
                }

                return resolve;
            });
        });
    }
};
