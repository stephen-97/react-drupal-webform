import { date } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateDate = (props) => {
    const { yupObject, defaultValues, key, required, defaultFieldValues, requiredMessage, errorMessage, customValidators, field, } = props;
    const type = field?.['#type'];
    const defaultSchema = date()
        .test('valid-date-format', 'Invalid date', (value) => {
        if (!value)
            return true;
        return !isNaN(Date.parse(value.toString()));
    })
        .nullable()
        .typeError(errorMessage);
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.date;
};
