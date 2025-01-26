import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/timed-entity-card.ts',
  output: {
    file: 'dist/timed-entity-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript(),
    terser()
  ]
};
