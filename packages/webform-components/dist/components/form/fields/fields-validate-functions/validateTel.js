import { string } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateTel = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, errorMessage, customValidators, } = props;
    const type = field?.['#type'];
    const defaultSchema = string().matches(/^[0-9]+$/, {
        message: errorMessage,
        excludeEmptyString: true,
    });
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.tel;
};
