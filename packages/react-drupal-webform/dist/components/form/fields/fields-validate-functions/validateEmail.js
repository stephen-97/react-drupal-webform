import { string } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateEmail = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, errorMessage, requiredMessage, customValidators, field, } = props;
    const type = field?.['#type'];
    const emailWithTLDRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
    const defaultSchema = string()
        .test('valid-email-format', 'invalid email', (v) => !v || emailWithTLDRegex.test(v))
        .email(errorMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.email;
};
