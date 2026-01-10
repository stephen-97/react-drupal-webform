import { mixed } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateManagedFile = (props) => {
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field?.['#type'];
    const defaultSchema = mixed()
        .test('fileRequired', 'file is required', (value) => {
        if (required) {
            return value instanceof File && value.size > 0;
        }
        return true;
    })
        .test('fileSize', `max size ${field?.['#max_filesize'] || 5} MB`, (value) => {
        if (!value || !(value instanceof File))
            return true;
        const maxFileSizeMB = field?.['#max_filesize'] || 10;
        const maxSizeInBytes = maxFileSizeMB * 1024 * 1024;
        return value.size < maxSizeInBytes;
    });
    const customSchema = resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.managed_file;
};
