import { boolean } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateCheckbox = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field?.['#type'];
    const defaultSchema = boolean();
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.oneOf([true], requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] =
        typeof field?.['#default_value'] !== 'undefined'
            ? Boolean(field?.['#default_value'])
            : defaultFieldValues.checkbox;
};
