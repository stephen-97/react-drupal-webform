import { string, object, mixed } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateRadio = (props) => {
    var _a;
    const { yupObject, defaultValues, key, field, required, valueFormat, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    const optionValues = Object.values(options);
    let defaultSchema;
    switch (valueFormat.radios) {
        case 'key':
            defaultSchema = string().oneOf(required ? optionKeys : ['', ...optionKeys], requiredMessage);
            break;
        case 'value':
            defaultSchema = string().oneOf(required ? optionValues : ['', ...optionValues], requiredMessage);
            break;
        case 'keyValue':
            defaultSchema = mixed().test('valid-keyValue', requiredMessage, (val) => {
                if (!required && (val === '' || val == null))
                    return true;
                if (typeof val !== 'object' || val === null)
                    return false;
                const keys = Object.keys(val);
                if (keys.length !== 1)
                    return false;
                const k = keys[0];
                return options[k] === val[k];
            });
            break;
        case 'booleanMap':
            defaultSchema = object().test('at-least-one-true', requiredMessage, (map) => Boolean(map) && Object.values(map).some((b) => b === true));
            break;
        default:
            defaultSchema = string();
    }
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.radios;
};
//# sourceMappingURL=validateRadios.js.map