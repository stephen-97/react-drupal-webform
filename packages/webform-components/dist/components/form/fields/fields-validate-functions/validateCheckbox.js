import { boolean } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateCheckbox = (props) => {
    var _a;
    const { yupObject, defaultValues, key, field, required, defaultFieldValues, requiredMessage, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const defaultSchema = boolean();
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.oneOf([true], requiredMessage)
        : customSchema.notRequired();
    defaultValues[key] =
        typeof (field === null || field === void 0 ? void 0 : field['#default_value']) !== 'undefined'
            ? Boolean(field === null || field === void 0 ? void 0 : field['#default_value'])
            : defaultFieldValues.checkbox;
};
//# sourceMappingURL=validateCheckbox.js.map