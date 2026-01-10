import { string } from 'yup';
import { applyMinMaxLength, resolveCustomValidator, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateTel = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, errorMessage, customValidators, minLengthMessage, maxLengthMessage, } = props;
    const type = field?.['#type'];
    let defaultSchema = string().matches(/^[0-9]+$/, {
        message: errorMessage,
        excludeEmptyString: true,
    });
    defaultSchema = applyMinMaxLength(defaultSchema, field, minLengthMessage, maxLengthMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.tel;
};
