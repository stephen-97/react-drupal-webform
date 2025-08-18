import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { getWebformProperties } from "../lib/functions/webform_functions";
import FormDefault from "./form/formDefault/formDefault";
import { defaultValueFormatObj, defaultValuesClassnames, defaultValuesFieldStateMessages, defaultValuesObj, } from "../lib/const/const.form";
import { deepMergeDefaults, } from "../lib/functions/utils_functions";
import { useMemo } from 'react';
import FormMultiStep from "./form/formMultiStep/formMultiStep";
const Webform = ({ elementsSource, valueFormat = {}, defaultFieldValues = {}, classNames = {}, defaultFieldStateMessages = {}, components, onSubmit, includeInactiveFieldsInSubmit = true, customValidators, }) => {
    const yupUseFormProps = {
        mode: 'onChange',
        reValidateMode: 'onBlur',
    };
    const mergedValueFormat = useMemo(() => ({
        ...defaultValueFormatObj,
        ...valueFormat,
    }), [valueFormat]);
    const mergedDefaultFieldValues = useMemo(() => ({
        ...defaultFieldValues,
        ...defaultValuesObj,
    }), [defaultFieldValues]);
    const mergedDefaultValuesStateMessages = useMemo(() => deepMergeDefaults(defaultValuesFieldStateMessages, defaultFieldStateMessages), [defaultFieldStateMessages]);
    const mergedClassNames = useMemo(() => deepMergeDefaults(defaultValuesClassnames, classNames), [classNames]);
    const { isMultiStep, elementsSources } = getWebformProperties(elementsSource);
    const Form = () => {
        if (isMultiStep) {
            return (_jsx(FormMultiStep, { yup: { yupUseFormProps }, elementsSource: elementsSources, valueFormat: mergedValueFormat, defaultFieldValues: mergedDefaultFieldValues, defaultFieldStateMessages: mergedDefaultValuesStateMessages, classNames: mergedClassNames, components: components, onSubmit: onSubmit, includeInactiveFieldsInSubmit: includeInactiveFieldsInSubmit, customValidators: customValidators }));
        }
        return (_jsx(FormDefault, { yup: { yupUseFormProps }, elementsSource: elementsSources, valueFormat: mergedValueFormat, defaultFieldValues: mergedDefaultFieldValues, defaultFieldStateMessages: mergedDefaultValuesStateMessages, classNames: mergedClassNames, components: components, onSubmit: onSubmit, includeInactiveFieldsInSubmit: includeInactiveFieldsInSubmit, customValidators: customValidators }));
    };
    return _jsx(_Fragment, { children: elementsSource && _jsx(Form, {}) });
};
export default Webform;
//# sourceMappingURL=webform.js.map