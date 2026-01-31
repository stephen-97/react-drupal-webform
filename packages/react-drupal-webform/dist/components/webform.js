import { jsx as _jsx } from "react/jsx-runtime";
import { getWebformProperties } from '../lib/functions/webform_functions';
import FormDefault from './form/formDefault/formDefault';
import { defaultValuesFieldStateMessages, defaultValuesObj, } from '../lib/const/const.form';
import { useMemo } from 'react';
import FormMultiStep from './form/formMultiStep/formMultiStep';
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions';
const Webform = ({ elementsSource, defaultFieldValues = {}, defaultFieldStateMessages = {}, components = {}, onSubmit, includeInactiveFieldsInSubmit = true, customValidators, isSubmitted, showConfirmation = true, classNamePrefix, unstyled = false, validationMode, disableActionButtonWhenInvalid, }) => {
    const mergedDefaultFieldValues = useMemo(() => ({
        ...defaultFieldValues,
        ...defaultValuesObj,
    }), [defaultFieldValues]);
    const mergedDefaultValuesStateMessages = useMemo(() => {
        return normalizeStateMessages(defaultFieldStateMessages, defaultValuesFieldStateMessages);
    }, [defaultFieldStateMessages]);
    const { isMultiStep, elementsSources } = getWebformProperties(elementsSource);
    const FormComponent = isMultiStep ? FormMultiStep : FormDefault;
    const formProps = {
        elementsSource: elementsSources,
        defaultFieldValues: mergedDefaultFieldValues,
        defaultFieldStateMessages: mergedDefaultValuesStateMessages,
        components,
        onSubmit,
        includeInactiveFieldsInSubmit,
        customValidators,
        isSubmitted,
        showConfirmation,
        classNamePrefix,
        unstyled,
        validationMode,
        disableActionButtonWhenInvalid,
    };
    return elementsSource ? _jsx(FormComponent, { ...formProps }) : null;
};
export default Webform;
