import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/timed-entity-card.js',
  output: {
    file: 'dist/timed-entity-card.js',
    format: 'es',
  },
  plugins: [resolve()],
};
