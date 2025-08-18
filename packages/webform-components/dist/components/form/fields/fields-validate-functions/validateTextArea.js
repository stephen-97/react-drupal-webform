import { string } from 'yup';
import { resolveCustomValidator, formatMessage, getRequiredMessage, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateTextArea = (props) => {
    var _a, _b;
    const { yupObject, defaultValues, key, required, defaultFieldValues, defaultFieldStateMessages, field, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const requiredMessage = formatMessage((_a = getRequiredMessage(defaultFieldStateMessages, 'textarea')) !== null && _a !== void 0 ? _a : '', field === null || field === void 0 ? void 0 : field['#title']);
    const defaultSchema = string();
    const customSchema = (_b = resolveCustomValidator(customValidators, key, type, props)) !== null && _b !== void 0 ? _b : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.textarea;
};
//# sourceMappingURL=validateTextArea.js.map