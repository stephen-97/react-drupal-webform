export const getRequiredMessage = (defaultFieldStateMessages, stateFieldName) => {
    if (defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]?.length > 0) {
        return defaultFieldStateMessages.fields['requiredMessages'][stateFieldName];
    }
    return defaultFieldStateMessages.general.requiredMessage;
};
export const getErrorMessage = (defaultFieldStateMessages, stateFieldName) => {
    if (defaultFieldStateMessages.fields['errorMessages'][stateFieldName]
        ?.length > 0) {
        return defaultFieldStateMessages.fields['errorMessages'][stateFieldName];
    }
    return defaultFieldStateMessages.general.errorMessage;
};
export const formatMessage = (template, fieldName) => {
    return template.replace('{fieldName}', fieldName);
};
export const resolveCustomValidator = (customValidators, key, type, args) => {
    if (!customValidators)
        return null;
    const byId = customValidators.byId?.[key];
    if (byId) {
        return byId(args);
    }
    if (type && customValidators.byType?.[type]) {
        console.log('ici', customValidators.byType[type]);
        return customValidators.byType[type](args);
    }
    return null;
};
const isLayoutField = (field) => [
    'container',
    'webform_flexbox',
    'webform_section',
    'details',
    'fieldset',
].includes(field?.['#type']);
export const extractValueFields = (elementsSource, acc = {}) => {
    Object.entries(elementsSource).forEach(([key, field]) => {
        if (!field || typeof field !== 'object')
            return;
        if (isLayoutField(field)) {
            Object.entries(field).forEach(([childKey, childField]) => {
                if (!childKey.startsWith('#')) {
                    extractValueFields({ [childKey]: childField }, acc);
                }
            });
            return;
        }
        if (field['#type'] === 'webform_markup')
            return;
        if (field['#type'] === 'webform_actions')
            return;
        acc[key] = field;
    });
    return acc;
};
export const getDummyDefaultFormDefault = (elementsSource, defaultFieldValues) => {
    const fields = extractValueFields(elementsSource);
    const defaults = {};
    Object.entries(fields).forEach(([key, field]) => {
        const type = field['#type'];
        if (!(type in defaultFieldValues))
            return;
        defaults[key] = defaultFieldValues[type];
    });
    return defaults;
};
export const applyMinMaxLength = (schema, field, minLengthMessage, maxLengthMessage) => {
    const isRequired = Boolean(field?.['#required']);
    let nextSchema = schema;
    if (typeof field?.['#minlength'] === 'number') {
        const minLength = field['#minlength'];
        nextSchema = nextSchema.test('min-length-if-not-empty', minLengthMessage, (value) => {
            if (!isRequired && value === '')
                return true;
            if (value == null)
                return true;
            return value.length >= minLength;
        });
    }
    if (typeof field?.['#maxlength'] === 'number') {
        const maxLength = field['#maxlength'];
        nextSchema = nextSchema.test('max-length-if-not-empty', maxLengthMessage, (value) => {
            if (!isRequired && value === '')
                return true;
            if (value == null)
                return true;
            return value.length <= maxLength;
        });
    }
    return nextSchema;
};
