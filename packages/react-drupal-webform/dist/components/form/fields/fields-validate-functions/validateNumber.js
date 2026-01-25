import { string } from 'yup';
import { resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions';
export const validateNumber = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field?.['#type'];
    let defaultSchema = string();
    defaultSchema = applyPatternIfApplicable({
        schema: defaultSchema,
        field,
    });
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.number;
};
