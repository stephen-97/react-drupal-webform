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
        return customValidators.byType[type](args);
    }
    return null;
};
export const getDummyDefaultFormDefault = (elementsSource) => {
    const allDefaults = {};
    Object.keys(elementsSource).forEach((key) => {
        const field = elementsSource[key];
        const type = field?.['#type'];
        if ([
            'container',
            'webform_flexbox',
            'webform_section',
            'details',
            'webform_actions',
        ].includes(type)) {
            return;
        }
        allDefaults[key] = '';
    });
    return allDefaults;
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
