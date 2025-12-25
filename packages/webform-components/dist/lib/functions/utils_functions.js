const mergeObjects = (defaultObj, newObj) => {
    if (!defaultObj || !newObj)
        return defaultObj || newObj;
    return Object.keys(defaultObj).reduce((acc, key) => {
        if (typeof defaultObj[key] === 'object' &&
            typeof newObj[key] === 'object') {
            acc[key] = mergeObjects(defaultObj[key], newObj[key]);
        }
        else {
            acc[key] = newObj[key] || defaultObj[key];
        }
        return acc;
    }, {});
};
const deepMergeDefaults = (defaults, overrides) => Object.keys(defaults).reduce((acc, key) => {
    const k = key;
    const defaultValue = defaults[k];
    const overrideValue = overrides?.[k];
    acc[k] =
        defaultValue !== null &&
            typeof defaultValue === 'object' &&
            !Array.isArray(defaultValue)
            ? deepMergeDefaults(defaultValue, (overrideValue ?? {}))
            : overrideValue !== undefined
                ? overrideValue
                : defaultValue;
    return acc;
}, Array.isArray(defaults) ? [] : {});
export { mergeObjects, deepMergeDefaults };
