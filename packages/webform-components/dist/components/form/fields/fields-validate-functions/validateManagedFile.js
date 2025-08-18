import { mixed } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateManagedFile = (props) => {
    var _a;
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const defaultSchema = mixed()
        .test('fileRequired', 'file is required', (value) => {
        if (required) {
            return value instanceof File && value.size > 0;
        }
        return true;
    })
        .test('fileSize', `max size ${(field === null || field === void 0 ? void 0 : field['#max_filesize']) || 5} MB`, (value) => {
        if (!value || !(value instanceof File))
            return true;
        const maxFileSizeMB = (field === null || field === void 0 ? void 0 : field['#max_filesize']) || 10;
        const maxSizeInBytes = maxFileSizeMB * 1024 * 1024;
        return value.size < maxSizeInBytes;
    });
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.managed_file;
};
//# sourceMappingURL=validateManagedFile.js.map