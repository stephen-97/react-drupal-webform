import { object, string } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateSelect = (props) => {
    var _a;
    const { yupObject, defaultValues, key, field, required, valueFormat, requiredMessage, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    let defaultSchema;
    switch (valueFormat.select) {
        case 'key':
            defaultSchema = string()
                .oneOf(optionKeys.concat(''))
                .transform((value) => (optionKeys.includes(value) ? value : ''));
            defaultValues[key] = '';
            break;
        case 'value':
            const optionValues = Object.values(options);
            defaultSchema = string()
                .oneOf(optionValues.concat(''))
                .transform((value) => (optionValues.includes(value) ? value : ''));
            defaultValues[key] = '';
            break;
        case 'keyValue':
            defaultSchema = object().transform((value) => {
                const k = Object.keys(value || {})[0];
                return optionKeys.includes(k) ? value : {};
            });
            defaultValues[key] = {};
            break;
        case 'booleanMap':
            defaultSchema = object();
            defaultValues[key] = optionKeys.reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            break;
        default:
            defaultSchema = string();
            defaultValues[key] = '';
    }
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
};
//# sourceMappingURL=validateSelect.js.map