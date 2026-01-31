import { boolean } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateCheckbox = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field?.['#type'];
    const baseSchema = resolveCustomValidator(customValidators, key, type, props) ?? boolean();
    if (required) {
        yupObject[key] = baseSchema.test('is-checked', requiredMessage, (value) => value === true);
    }
    else {
        yupObject[key] = baseSchema.notRequired();
    }
    defaultValues[key] = defaultFieldValues.checkbox;
};
