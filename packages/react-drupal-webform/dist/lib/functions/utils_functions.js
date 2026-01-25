import { FIELD_TYPE_TO_GROUP } from '../const/const.form';
import cn from 'classnames';
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
export const getDataAttributes = ({ type, component, }) => {
    const groupType = type ? FIELD_TYPE_TO_GROUP[type] : undefined;
    return {
        ...(type ? { 'data-type': type } : {}),
        ...(groupType ? { 'data-group-type': groupType } : {}),
        ...(component ? { 'data-component': component } : {}),
    };
};
export const getClassNames = ({ name, prefix, unstyled, baseCn, modifiers, }) => {
    const baseName = prefix ? `${prefix}-webform-${name}` : `webform-${name}`;
    const modifierClasses = modifiers
        ? Object.fromEntries(Object.entries(modifiers).map(([key, value]) => [
            `${baseName}--${key}`,
            value,
        ]))
        : undefined;
    return cn(baseName, modifierClasses, baseCn);
};
export const getAriaDescribedBy = ({ fieldKey, field, }) => {
    const hasDescription = Boolean(field?.['#description']) || Boolean(field?.['#file_placeholder']);
    return hasDescription ? `description-${fieldKey}` : undefined;
};
export const getTextLikeInputAttributes = (field, type) => {
    const attrs = {};
    if (field['#placeholder']) {
        attrs.placeholder = field['#placeholder'];
    }
    if (field['#required']) {
        attrs.required = true;
    }
    if (['text', 'email', 'tel', 'password'].includes(type)) {
        if (field['#minlength'] != null) {
            attrs.minLength = field['#minlength'];
        }
        if (field['#maxlength'] != null) {
            attrs.maxLength = field['#maxlength'];
        }
        if (field['#size'] != null) {
            attrs.size = field['#size'];
        }
    }
    if (field['#pattern'] && ['text', 'tel', 'password'].includes(type)) {
        attrs.pattern = field['#pattern'];
    }
    if (type === 'number') {
        if (field['#min'] != null) {
            attrs.min = field['#min'];
        }
        if (field['#max'] != null) {
            attrs.max = field['#max'];
        }
    }
    if (type === 'date') {
        if (field['#min'] != null) {
            attrs.min = field['#min'];
        }
        if (field['#max'] != null) {
            attrs.max = field['#max'];
        }
    }
    return attrs;
};
export const applyPatternIfApplicable = ({ schema, field, fallbackMessage, }) => {
    const pattern = field?.['#pattern'];
    if (!pattern)
        return schema;
    const errorMessage = field?.['#pattern_error'] || fallbackMessage;
    try {
        const regex = new RegExp(pattern);
        return schema.test('pattern', errorMessage, (value) => {
            if (!value)
                return true;
            return regex.test(value);
        });
    }
    catch {
        return schema;
    }
};
