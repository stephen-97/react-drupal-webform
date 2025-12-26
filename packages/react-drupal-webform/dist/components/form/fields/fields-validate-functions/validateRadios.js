import { string } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateRadio = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field?.['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    const defaultSchema = string().oneOf(required ? optionKeys : ['', ...optionKeys], requiredMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.radios;
};
