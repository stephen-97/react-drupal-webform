import { date } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateDate = (props) => {
    var _a;
    const { yupObject, defaultValues, key, required, defaultFieldValues, requiredMessage, errorMessage, customValidators, field, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const defaultSchema = date()
        .test('valid-date-format', 'Invalid date', (value) => {
        if (!value)
            return true;
        return !isNaN(Date.parse(value.toString()));
    })
        .nullable()
        .typeError(errorMessage);
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] = defaultFieldValues.date;
};
//# sourceMappingURL=validateDate.js.map