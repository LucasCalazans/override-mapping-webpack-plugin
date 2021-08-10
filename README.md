# Override Mapping Webpack Plugin

This plugin is used on PWA Studio project. It helps you to override components/files.

# Usage

You just need to add this library as dev dependency to your project 

```bash
yarn add -D github:lucascalazans/override-mapping-webpack-plugin
```

## How to create a new override

This plugin works with all dependencies inside the `node_modules` folder.

All you need to do is to get the file path that you want to override and create the same structure.

Let's get for example the logo file:

```
@magento/venia-ui/lib/components/Logo/VeniaLogo.svg
```

1. Create a new folder called `override` inside the `src` folder (Same level as the webpack.config.js file)
2. After creating this folder you need to create the same structure as the original file, for our example it will be
```
src/override/@magento/venia-ui/lib/components/Logo/VeniaLogo.svg
```
3. Change the content of `VeniaLogo.svg` and 
