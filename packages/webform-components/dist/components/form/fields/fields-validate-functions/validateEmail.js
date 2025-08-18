import { string } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateEmail = (props) => {
    var _a;
    const { yupObject, defaultValues, key, required, defaultFieldValues, errorMessage, requiredMessage, customValidators, field, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const emailWithTLDRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
    const defaultSchema = string()
        .test('valid-email-format', 'invalid email', (v) => !v || emailWithTLDRegex.test(v))
        .email(errorMessage);
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.email;
};
//# sourceMappingURL=validateEmail.js.map