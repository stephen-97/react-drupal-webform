import { string } from 'yup';
import { resolveCustomValidator, formatMessage, getRequiredMessage, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateTextArea = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, defaultFieldStateMessages, field, customValidators, } = props;
    const type = field?.['#type'];
    const requiredMessage = formatMessage(getRequiredMessage(defaultFieldStateMessages, 'textarea') ?? '', field?.['#title']);
    const defaultSchema = string();
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.textarea;
};
