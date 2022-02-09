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

## Imports Paths
Note that you need to change all the imports paths, let’s use the postcode component as an example.

Here are all the imports that this component has:

```javascript
import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { usePostcode } from '@magento/peregrine/lib/talons/Postcode/usePostcode';

import { mergeClasses } from '../../classify';
import Field from '../Field';
import TextInput from '../TextInput';
import defaultClasses from './postcode.css';
```

All the relative imports need to be changed, so for this example, it should be like this:

```javascript
import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { usePostcode } from '@magento/peregrine/lib/talons/Postcode/usePostcode';

import { mergeClasses } from "@magento/venia-ui/lib/classify";
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from '@magento/venia-ui/lib/components/Postcode/postcode.css';
```

# Important Note
You should not add new components or files to the override folder, since the Webpack will search for the path that you created (Inside the override folder) and will try to find a file with the same path inside the node_modules folder.

If you create a new component (Which doesn’t exist inside the node_modules folder) you should add this component to the src/components folder.
