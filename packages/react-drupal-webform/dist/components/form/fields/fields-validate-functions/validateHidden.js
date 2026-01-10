import { mixed } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateHidden = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, requiredMessage, customValidators, field, } = props;
    const type = field?.['#type'];
    const defaultSchema = mixed();
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage ?? 'This field is required')
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.hidden ?? '';
};
