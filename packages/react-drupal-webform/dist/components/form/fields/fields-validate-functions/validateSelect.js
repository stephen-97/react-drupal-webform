import { string } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateSelect = (props) => {
    const { yupObject, defaultValues, key, field, required, requiredMessage, customValidators, defaultFieldValues, } = props;
    const type = field?.['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    const defaultSchema = string()
        .oneOf(optionKeys.concat(''))
        .transform((value) => (optionKeys.includes(value) ? value : ''));
    defaultValues[key] = field?.['#default_value'] ?? defaultFieldValues.select;
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
};
