declare const mergeObjects: (defaultObj: Record<string, any>, newObj: Record<string, any>) => Record<string, any>;
declare const deepMergeDefaults: <T extends object>(defaults: T, overrides: Partial<T>) => T;
export { mergeObjects, deepMergeDefaults };
