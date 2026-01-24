import { jsx as _jsx } from "react/jsx-runtime";
import { getWebformProperties } from '../lib/functions/webform_functions';
import FormDefault from './form/formDefault/formDefault';
import { defaultValuesClassnames, defaultValuesFieldStateMessages, defaultValuesObj, } from '../lib/const/const.form';
import { mergeObjects } from '../lib/functions/utils_functions';
import { useMemo } from 'react';
import FormMultiStep from './form/formMultiStep/formMultiStep';
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions';
const Webform = ({ elementsSource, defaultFieldValues = {}, classNames = {}, defaultFieldStateMessages = {}, components = {}, onSubmit, includeInactiveFieldsInSubmit = true, customValidators, isSubmitted, showConfirmation = true, classNamePrefix, }) => {
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
    const FormComponent = isMultiStep ? FormMultiStep : FormDefault;
    const formProps = {
        yup: { yupUseFormProps },
        elementsSource: elementsSources,
        defaultFieldValues: mergedDefaultFieldValues,
        defaultFieldStateMessages: mergedDefaultValuesStateMessages,
        classNames: mergedClassNames,
        components,
        onSubmit,
        includeInactiveFieldsInSubmit,
        customValidators,
        isSubmitted,
        showConfirmation,
        classNamePrefix,
    };
    return elementsSource ? _jsx(FormComponent, { ...formProps }) : null;
};
export default Webform;
