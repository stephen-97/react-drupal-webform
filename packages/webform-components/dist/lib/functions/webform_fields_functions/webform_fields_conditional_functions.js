import { formatMessage, getErrorMessage, getRequiredMessage, } from "../webform_validation_functions/webform_validation_functions";
import FormMappingFields from "../../../components/form/formMappingFields/formMappingFields";
import * as yup from 'yup';
export const checkVisibilityCondition = (format, depConfig, watched, expectedKeyOrValue) => {
    var _a;
    switch (format) {
        case 'key':
            return watched === expectedKeyOrValue;
        case 'value': {
            const options = depConfig['#options'] || {};
            const expectedValue = (_a = options[expectedKeyOrValue]) !== null && _a !== void 0 ? _a : expectedKeyOrValue;
            return watched === expectedValue;
        }
        case 'keyValue': {
            if (typeof watched !== 'object' || watched === null)
                return false;
            const optionsKV = depConfig['#options'] || {};
            const expected = expectedKeyOrValue;
            if (Array.isArray(expected)) {
                return expected.every((key) => key in watched &&
                    watched[key] === optionsKV[key]);
            }
            return (expected in watched &&
                watched[expected] === optionsKV[expected]);
        }
        case 'booleanMap': {
            if (typeof watched !== 'object' || watched === null)
                return false;
            if (Array.isArray(expectedKeyOrValue)) {
                return expectedKeyOrValue.every((k) => watched[k] === true);
            }
            return watched[expectedKeyOrValue] === true;
        }
        default:
            return false;
    }
};
export function shouldFieldBeVisible(fieldKey, elementsSource, watchedValues, valueFormat) {
    var _a;
    const fieldConfig = elementsSource[fieldKey];
    const visibleStates = (_a = fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig['#states']) === null || _a === void 0 ? void 0 : _a.visible;
    if (!visibleStates) {
        return true;
    }
    if (!Array.isArray(visibleStates)) {
        return Object.entries(visibleStates).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const depConfig = elementsSource[depName];
            const depType = depConfig === null || depConfig === void 0 ? void 0 : depConfig['#type'];
            const format = valueFormat[depType] || 'key';
            const watched = watchedValues[depName];
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return checkVisibilityCondition(format, depConfig, watched, conditions.value);
            }
            return true;
        });
    }
    return visibleStates.some((stateCond) => {
        if (typeof stateCond !== 'object' || stateCond === null)
            return false;
        return Object.entries(stateCond).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const depConfig = elementsSource[depName];
            const depType = depConfig === null || depConfig === void 0 ? void 0 : depConfig['#type'];
            const format = valueFormat[depType] || 'key';
            const watched = watchedValues[depName];
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return checkVisibilityCondition(format, depConfig, watched, conditions.value);
            }
            return true;
        });
    });
}
export function shouldMultiStepFieldBeVisible(fieldKey, elementsSource, watchedStepValues, prevStepValues, currentFieldKeys, valueFormat) {
    var _a;
    const fieldConfig = elementsSource[fieldKey];
    const visibleStates = (_a = fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig['#states']) === null || _a === void 0 ? void 0 : _a.visible;
    if (!visibleStates)
        return true;
    // Résolution de la valeur de dépendance, selon où elle se trouve
    function getDependencyValue(depName) {
        if (currentFieldKeys.includes(depName)) {
            return watchedStepValues[depName];
        }
        return prevStepValues[depName];
    }
    // Cas objet classique
    if (!Array.isArray(visibleStates)) {
        return Object.entries(visibleStates).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const depConfig = elementsSource[depName];
            const depType = depConfig === null || depConfig === void 0 ? void 0 : depConfig['#type'];
            const format = valueFormat[depType] || 'key';
            const watched = getDependencyValue(depName);
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return checkVisibilityCondition(format, depConfig, watched, conditions.value);
            }
            return true;
        });
    }
    return visibleStates.some((stateCond) => {
        if (typeof stateCond !== 'object' || stateCond === null)
            return false;
        return Object.entries(stateCond).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const depConfig = elementsSource[depName];
            const depType = depConfig === null || depConfig === void 0 ? void 0 : depConfig['#type'];
            const format = valueFormat[depType] || 'key';
            const watched = getDependencyValue(depName);
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return checkVisibilityCondition(format, depConfig, watched, conditions.value);
            }
            return true;
        });
    });
}
export function getDependentFields(elementsSource) {
    const depsMap = new Map();
    Object.entries(elementsSource).forEach(([_, fieldConfig]) => {
        var _a;
        const visibleStates = (_a = fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig['#states']) === null || _a === void 0 ? void 0 : _a.visible;
        if (!visibleStates)
            return;
        if (Array.isArray(visibleStates)) {
            visibleStates.forEach((stateCond) => {
                if (typeof stateCond !== 'object' || stateCond === null)
                    return;
                Object.keys(stateCond).forEach((selector) => {
                    var _a;
                    const match = selector.match(/:input\[name="([^"]+)"\]/);
                    if (match) {
                        const depName = match[1];
                        const depType = ((_a = elementsSource[depName]) === null || _a === void 0 ? void 0 : _a['#type']) || 'unknown';
                        depsMap.set(depName, depType);
                    }
                });
            });
        }
        else {
            Object.keys(visibleStates).forEach((selector) => {
                var _a;
                const match = selector.match(/:input\[name="([^"]+)"\]/);
                if (match) {
                    const depName = match[1];
                    const depType = ((_a = elementsSource[depName]) === null || _a === void 0 ? void 0 : _a['#type']) || 'unknown';
                    depsMap.set(depName, depType);
                }
            });
        }
    });
    return Array.from(depsMap.entries()).map(([name, type]) => ({ name, type }));
}
export const generateFormSchemaAndDefaults = ({ elementsSource, visibleElementsKeys, valueFormat, defaultFieldValues, defaultFieldStateMessages, customValidators, }) => {
    const defaults = {};
    const yupObjLocal = {};
    visibleElementsKeys.forEach((key) => {
        var _a, _b, _c, _d;
        const field = elementsSource[key];
        const type = field['#type'];
        const required = field === null || field === void 0 ? void 0 : field['#required'];
        const requiredMessage = formatMessage((_a = getRequiredMessage(defaultFieldStateMessages, type)) !== null && _a !== void 0 ? _a : '', field === null || field === void 0 ? void 0 : field['#title']);
        const errorMessage = formatMessage((_b = getErrorMessage(defaultFieldStateMessages, type)) !== null && _b !== void 0 ? _b : '', field === null || field === void 0 ? void 0 : field['#title']);
        (_d = (_c = FormMappingFields[type !== null && type !== void 0 ? type : 'default']) === null || _c === void 0 ? void 0 : _c.validator) === null || _d === void 0 ? void 0 : _d.call(_c, {
            yupObject: yupObjLocal,
            defaultValues: defaults,
            key,
            field,
            required: Boolean(required),
            valueFormat,
            defaultFieldValues,
            defaultFieldStateMessages,
            requiredMessage,
            customValidators,
            errorMessage,
        });
    });
    return {
        defaultValues: defaults,
        validationSchema: yup.object().shape(yupObjLocal),
    };
};
//# sourceMappingURL=webform_fields_conditional_functions.js.map