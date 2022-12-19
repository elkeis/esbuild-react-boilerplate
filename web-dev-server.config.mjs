import { esbuildPlugin } from "@web/dev-server-esbuild";
import {fromRollup} from '@web/dev-server-rollup';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from "autoprefixer";
import nested from 'postcss-nested';


const postcssPlugin = fromRollup(postcss);

export default {
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ tsx: true, jsxFactory: "React.createElement", jsxFragment: "Fragment" }),
    postcssPlugin({
      plugins: [
        autoprefixer,
        nested,
      ]
    }),
  ],

  mimeTypes: {
    '**/*.css': 'js'
  },

  http2: true,
  sslCert: '.cert/dev.cert',
  sslKey: '.cert/dev.key',
};
