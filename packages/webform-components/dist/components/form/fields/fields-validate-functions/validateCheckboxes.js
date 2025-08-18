import { array, object, string } from 'yup';
import { resolveCustomValidator } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateCheckboxes = (props) => {
    var _a;
    const { yupObject, defaultValues, key, field, required, valueFormat, requiredMessage, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    const { checkboxes: checkboxesFormat } = valueFormat;
    let schema;
    switch (checkboxesFormat) {
        case 'key':
        case 'value':
            schema = array()
                .of(string().oneOf(optionKeys))
                .default(() => []);
            if (required)
                schema = schema.min(1, requiredMessage);
            defaultValues[key] = '';
            break;
        case 'keyValue':
            schema = array()
                .of(object({
                key: string().oneOf(optionKeys),
                value: string(),
            }))
                .default(() => []);
            if (required)
                schema = schema.min(1, requiredMessage);
            defaultValues[key] = [];
            break;
        case 'booleanMap':
            schema = object();
            if (required) {
                schema = object().test('at-least-one-true', requiredMessage, (value) => value && Object.values(value).some((v) => v === true));
            }
            defaultValues[key] = optionKeys.reduce((acc, optKey) => {
                acc[optKey] = false;
                return acc;
            }, {});
            break;
        default:
            schema = array().default(() => []);
            defaultValues[key] = [];
            break;
    }
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : schema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
};
//# sourceMappingURL=validateCheckboxes.js.map