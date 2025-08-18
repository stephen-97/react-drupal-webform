import { string } from 'yup';
import { resolveCustomValidator, } from "../../../../lib/functions/webform_validation_functions/webform_validation_functions";
export const validateTextField = (props) => {
    var _a;
    const { yupObject, defaultValues, key, required, defaultFieldValues, requiredMessage, field, customValidators, } = props;
    const type = field === null || field === void 0 ? void 0 : field['#type'];
    const defaultSchema = string();
    const customSchema = (_a = resolveCustomValidator(customValidators, key, type, props)) !== null && _a !== void 0 ? _a : defaultSchema;
    yupObject[key] = required
        ? customSchema.required(requiredMessage)
        : customSchema;
    defaultValues[key] = defaultFieldValues.textfield;
};
//# sourceMappingURL=validateTextfield.js.map