export type DeepMutable<T> = T extends object
 ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
 : T;
