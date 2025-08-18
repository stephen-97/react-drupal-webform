export const getRequiredMessage = (defaultFieldStateMessages, stateFieldName) => {
    var _a;
    if (((_a = defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return defaultFieldStateMessages.fields['requiredMessages'][stateFieldName];
    }
    return defaultFieldStateMessages.general.requiredMessage;
};
export const getErrorMessage = (defaultFieldStateMessages, stateFieldName) => {
    var _a;
    if (((_a = defaultFieldStateMessages.fields['errorMessages'][stateFieldName]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return defaultFieldStateMessages.fields['errorMessages'][stateFieldName];
    }
    return defaultFieldStateMessages.general.errorMessage;
};
export const formatMessage = (template, fieldName) => {
    return template.replace('{fieldName}', fieldName);
};
export const resolveCustomValidator = (customValidators, key, type, args) => {
    var _a, _b;
    if (!customValidators)
        return null;
    // Vérifie par ID d'abord
    const byId = (_a = customValidators.byId) === null || _a === void 0 ? void 0 : _a[key];
    if (byId) {
        return byId(args);
    }
    // Sinon vérifie par type
    if (type && ((_b = customValidators.byType) === null || _b === void 0 ? void 0 : _b[type])) {
        return customValidators.byType[type](args);
    }
    return null;
};
//# sourceMappingURL=webform_validation_functions.js.map