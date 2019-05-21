const cssnano = require('cssnano');
const postcss_color_mod = require('postcss-color-mod-function');
const postcss_preset_env = require('postcss-preset-env');
const postcss_Import = require('postcss-import');
const postcss_Url = require('postcss-url');


module.exports = {
   plugins: [
      postcss_Import(),
      postcss_Url(),
      require('tailwindcss'),
      postcss_preset_env({
         stage: 0,
         autoprefixer: {
            grid: true,
         },
      }),
      postcss_color_mod(),
      cssnano({
         autoprefixer: false,
         preset: ['default'],
      }),
   ],
};
