export const useYupValidationResolver = (validationSchema) => async (data) => {
    try {
        const values = await validationSchema.validate(data, {
            abortEarly: false,
        });
        return {
            values,
            errors: {},
        };
    }
    catch (errors) {
        return {
            values: {},
            errors: errors.inner.reduce((allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                },
            }), {}),
        };
    }
};
export const isErrorMessageFieldType = (type) => {
    return (type !== 'webform_markup' &&
        type !== 'webform_actions' &&
        type !== 'fieldset');
};
export const isLengthMessageFieldType = (type) => {
    return (typeof type === 'string' &&
        type !== 'webform_markup' &&
        type !== 'webform_actions' &&
        type !== 'fieldset' &&
        type !== 'select' &&
        type !== 'managed_file');
};
export const resolveFieldMessages = (props) => {
    const { field, defaultFieldStateMessages } = props;
    const type = field?.['#type'];
    const fieldName = field?.['#title'] ?? '';
    const minLength = typeof field?.['#minlength'] === 'number' ? String(field['#minlength']) : '';
    const maxLength = typeof field?.['#maxlength'] === 'number' ? String(field['#maxlength']) : '';
    const resolve = (v) => {
        if (!v)
            return '';
        return typeof v === 'function' ? v(field) : v;
    };
    const replaceTokens = (msg) => msg
        .replace('{fieldName}', fieldName)
        .replace('{minLength}', minLength)
        .replace('{maxLength}', maxLength);
    const general = defaultFieldStateMessages.general;
    const fields = defaultFieldStateMessages.fields;
    const required = isErrorMessageFieldType(type)
        ? resolve(fields.requiredMessages[type])
        : '';
    const error = isErrorMessageFieldType(type)
        ? resolve(fields.errorMessages[type])
        : '';
    const minLen = isLengthMessageFieldType(type)
        ? resolve(fields.minLengthMessages?.[type])
        : '';
    const maxLen = isLengthMessageFieldType(type)
        ? resolve(fields.maxLengthMessages?.[type])
        : '';
    return {
        required: replaceTokens(required || resolve(general.requiredMessage)),
        error: replaceTokens(error || resolve(general.errorMessage)),
        minLength: replaceTokens(minLen || resolve(general.minLengthMessage)),
        maxLength: replaceTokens(maxLen || resolve(general.maxLengthMessage)),
    };
};
