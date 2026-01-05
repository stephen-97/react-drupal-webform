import { string } from 'yup';
import { resolveCustomValidator, formatMessage, getRequiredMessage, applyMinMaxLength, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
export const validateTextArea = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, defaultFieldStateMessages, field, customValidators, minLengthMessage, maxLengthMessage, } = props;
    const type = field?.['#type'];
    const requiredMessage = formatMessage(getRequiredMessage(defaultFieldStateMessages, 'textarea') ?? '', field?.['#title']);
    let defaultSchema = string();
    defaultSchema = applyMinMaxLength(defaultSchema, field, minLengthMessage, maxLengthMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.textarea;
};
