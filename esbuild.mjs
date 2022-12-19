import esbuild from 'esbuild';
import fs from 'fs/promises';
import {existsSync} from 'fs';
import stylePlugin from 'esbuild-plugin-postcss2';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';


const cleanup = async () => {
  if (existsSync('dist')){
    await fs.rm('dist/', {recursive: true});
  }
}

const buildHTML = async () => {
  const html = await fs.readFile('index.html', 'utf-8');
  const result = html.replace('index.tsx', 'index.js').replace('index.scss', 'index.css');
  
  if (!existsSync('dist')){
    fs.mkdir('dist');
  }

  console.log('writing');

  await fs.writeFile('dist/index.html', result);
}

const buildBundle = () => {
  esbuild.build({
    entryPoints: ['index.tsx'],
    outfile: 'dist/index.js',
    bundle: true,
    plugins: [
      stylePlugin.default({
        modules: true,
        rootDir: process.cwd(),
        sassOptions: {},
        lessOptions: {},
        stylusOptions: {},
        writeToFile: true,
        plugins: [nested, autoprefixer],
      })
    ],
  })
}

const runAll = async () => {
  try {
    await cleanup();
    await buildBundle();
    await buildHTML();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

runAll();
