import { array, string } from 'yup';
import { resolveCustomValidator } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateCheckboxes = (props) => {
    const { yupObject, defaultValues, key, field, required, requiredMessage, customValidators, defaultFieldValues, } = props;
    const type = field?.['#type'];
    const options = field['#options'];
    const optionKeys = Object.keys(options);
    let schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => []);
    if (required)
        schema = schema.min(1, requiredMessage);
    defaultValues[key] = defaultFieldValues.checkboxes;
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? schema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
};
