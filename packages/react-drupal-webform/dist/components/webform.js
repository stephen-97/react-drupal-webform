import { jsx as _jsx } from "react/jsx-runtime";
import { getWebformProperties } from '../lib/functions/webform_functions';
import FormDefault from './form/formDefault/formDefault';
import { defaultValuesFieldStateMessages, defaultValuesObj, } from '../lib/const/const.form';
import { useMemo } from 'react';
import FormMultiStep from './form/formMultiStep/formMultiStep';
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions';
const Webform = ({ elementsSource, defaultFieldStateMessages = {}, components = {}, onSubmit, includeInactiveFieldsInSubmit = true, customValidators, classNamePrefix, unstyled = false, rhfValidationMode = 'all', disableActionButtonWhenInvalid, }) => {
    const mergedDefaultFieldValues = useMemo(() => ({
        ...{},
        ...defaultValuesObj,
    }), []);
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
        classNamePrefix,
        unstyled,
        rhfValidationMode,
        disableActionButtonWhenInvalid,
    };
    return elementsSource ? _jsx(FormComponent, { ...formProps }) : null;
};
export default Webform;
