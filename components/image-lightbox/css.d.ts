/*
 * With `noUncheckedSideEffectImports` on (the editor's TS server enables it),
 * `import 'something.css'` errors with TS2882 because a stylesheet has no type
 * declarations. The bundler resolves these, TypeScript just needs to be told
 * they exist. Ambient declarations are project wide by nature, so this also
 * covers the same pre-existing errors on the `globals.css`, `keen-slider` and
 * `leaflet` stylesheet imports in the layouts.
 */
declare module '*.css';
