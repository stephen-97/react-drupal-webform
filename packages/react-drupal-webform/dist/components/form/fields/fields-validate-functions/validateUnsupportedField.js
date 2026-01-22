import { mixed } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateUnsupportedField = (props) => {
    const { yupObject, defaultValues, key, customValidators, field } = props;
    const type = field?.['#type'];
    const defaultSchema = mixed();
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = customSchema;
    defaultValues[key] = '';
};
