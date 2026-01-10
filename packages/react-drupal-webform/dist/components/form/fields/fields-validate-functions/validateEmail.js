import { string } from 'yup';
import { applyMinMaxLength, resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateEmail = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, errorMessage, requiredMessage, customValidators, minLengthMessage, maxLengthMessage, field, } = props;
    const type = field?.['#type'];
    const emailWithTLDRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
    let defaultSchema = string()
        .test('valid-email-format', 'invalid email', (v) => !v || emailWithTLDRegex.test(v))
        .email(errorMessage);
    defaultSchema = applyMinMaxLength(defaultSchema, field, minLengthMessage, maxLengthMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.email;
};
