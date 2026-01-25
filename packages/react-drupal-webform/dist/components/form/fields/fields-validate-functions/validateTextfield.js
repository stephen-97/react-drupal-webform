import { string } from 'yup';
import { applyMinMaxLength, resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions';
export const validateTextField = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, requiredMessage, field, customValidators, minLengthMessage, maxLengthMessage, } = props;
    const type = field?.['#type'];
    let baseSchema = string();
    baseSchema = applyMinMaxLength(baseSchema, field, minLengthMessage, maxLengthMessage);
    baseSchema = applyPatternIfApplicable({
        schema: baseSchema,
        field,
    });
    if (required) {
        baseSchema = baseSchema.required(requiredMessage);
    }
    yupObject[key] =
        resolveCustomValidator(customValidators, key, type, props) ?? baseSchema;
    defaultValues[key] = defaultFieldValues.textfield;
};
