# Override Mapping Webpack Plugin

This plugin is used on PWA Studio project. It helps you to override components/files.

# Usage

```bash
yarn add -D github:lucascalazans/override-mapping-webpack-plugin
```

Import it as a new plugin on your `webpack.config.js` file.

1. First of all you need to import this library on top of your `webpack.config.js`
```javascript
const overrideMappingPlugin = require('override-mapping-webpack-plugin');
```
2. Add the following line after the `config.plugins` definition

```javascript
clientConfig.plugins.push(new overrideMappingPlugin());
```

## How to create a new override

This plugin works with all dependencies inside the `node_modules` folder.

All you need to do is to get the file path that you want to override and create the same structure.

Lets get for example the logo file:

```
@magento/venia-ui/lib/components/Logo/VeniaLogo.svg
```

1. Create a new folder called `override` on project root (Same level as the webpack.config.js file)
2. After creating this folder you need to create the same structure as the original file, for our example it will be
```
override/@magento/venia-ui/lib/components/Logo/VeniaLogo.svg
```
3. Change the content of `VeniaLogo.svg` and 
