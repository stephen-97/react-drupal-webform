import { string } from 'yup';
import { resolveCustomValidator, formatMessage, getRequiredMessage, applyMinMaxLength, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions';
export const validateTextArea = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, defaultFieldStateMessages, field, customValidators, minLengthMessage, maxLengthMessage, } = props;
    if (field?.['#readonly']) {
        defaultValues[key] = defaultFieldValues.textarea;
        return;
    }
    const type = field?.['#type'];
    const requiredMessage = formatMessage(getRequiredMessage(defaultFieldStateMessages, 'textarea') ?? '', field?.['#title']);
    let defaultSchema = string();
    defaultSchema = applyMinMaxLength(defaultSchema, field, minLengthMessage, maxLengthMessage);
    defaultSchema = applyPatternIfApplicable({
        schema: defaultSchema,
        field,
    });
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.textarea;
};
