const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const baseConfig = require('../../tailwind.config.base');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// '../shared/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// '!../shared/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    // Include shared library components
    '../../shared/src/**/*.{ts,tsx,js,jsx,html}',
    '!../../shared/src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      // App-specific theme extensions can go here
    },
  },
};
