import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { getWebformProperties } from '../lib/functions/webform_functions';
import FormDefault from './form/formDefault/formDefault';
import { defaultValuesClassnames, defaultValuesFieldStateMessages, defaultValuesObj, } from '../lib/const/const.form';
import { mergeObjects } from '../lib/functions/utils_functions';
import { useMemo } from 'react';
import FormMultiStep from './form/formMultiStep/formMultiStep';
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions';
const Webform = ({ elementsSource, defaultFieldValues = {}, classNames = {}, defaultFieldStateMessages = {}, components = {}, onSubmit, includeInactiveFieldsInSubmit = true, customValidators, }) => {
    const yupUseFormProps = {
        mode: 'onChange',
        reValidateMode: 'onBlur',
    };
    const mergedDefaultFieldValues = useMemo(() => ({
        ...defaultFieldValues,
        ...defaultValuesObj,
    }), [defaultFieldValues]);
    const mergedDefaultValuesStateMessages = useMemo(() => {
        return normalizeStateMessages(defaultFieldStateMessages, defaultValuesFieldStateMessages);
    }, [defaultFieldStateMessages]);
    const mergedClassNames = useMemo(() => mergeObjects(defaultValuesClassnames, classNames), [classNames]);
    const { isMultiStep, elementsSources } = getWebformProperties(elementsSource);
    const Form = () => {
        if (isMultiStep) {
            return (_jsx(FormMultiStep, { yup: { yupUseFormProps }, elementsSource: elementsSources, defaultFieldValues: mergedDefaultFieldValues, defaultFieldStateMessages: mergedDefaultValuesStateMessages, classNames: mergedClassNames, components: components, onSubmit: onSubmit, includeInactiveFieldsInSubmit: includeInactiveFieldsInSubmit, customValidators: customValidators }));
        }
        return (_jsx(FormDefault, { yup: { yupUseFormProps }, elementsSource: elementsSources, defaultFieldValues: mergedDefaultFieldValues, defaultFieldStateMessages: mergedDefaultValuesStateMessages, classNames: mergedClassNames, components: components, onSubmit: onSubmit, includeInactiveFieldsInSubmit: includeInactiveFieldsInSubmit, customValidators: customValidators }));
    };
    return _jsx(_Fragment, { children: elementsSource && _jsx(Form, {}) });
};
export default Webform;
