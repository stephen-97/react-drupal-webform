import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useMemo, useCallback } from 'react';
import { useForm, useWatch, FormProvider } from 'react-hook-form';
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions';
import FormFieldRendered from './formFieldRendered';
import { generateFormSchemaAndDefaults, getDependentFields, shouldFieldBeVisible, isLayoutType, } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
import { getDummyDefaultFormDefault } from '../../../lib/functions/webform_validation_functions/webform_validation_functions';
import Form from '../form';
const FormDefault = (props) => {
    const { elementsSource, multiStepExtra, defaultFieldValues, defaultFieldStateMessages, components, includeInactiveFieldsInSubmit, onSubmit, customValidators, classNamePrefix, unstyled = false, validationMode, disableActionButtonWhenInvalid = false, } = props;
    const isMultiStep = Boolean(multiStepExtra);
    const dependentFields = useMemo(() => getDependentFields(elementsSource), [elementsSource]);
    const dependentFieldNames = useMemo(() => dependentFields.map((dep) => dep.name), [dependentFields]);
    const dummyDefaultValues = useMemo(() => getDummyDefaultFormDefault(elementsSource, defaultFieldValues), [elementsSource]);
    const isHtmlNative = validationMode === 'htmlNative';
    const methods = useForm({
        mode: isHtmlNative ? undefined : validationMode,
        criteriaMode: 'all',
        defaultValues: dummyDefaultValues,
        shouldUnregister: true,
    });
    const { control, reset, getValues, handleSubmit } = methods;
    const watchedValuesArray = useWatch({ control, name: dependentFieldNames });
    const watchedValues = useMemo(() => {
        return dependentFields.reduce((acc, key, i) => {
            acc[key.name] = watchedValuesArray?.[i];
            return acc;
        }, {});
    }, [watchedValuesArray, dependentFields]);
    const visibleElementsKeys = useMemo(() => {
        return Object.keys(elementsSource).filter((key) => shouldFieldBeVisible(key, elementsSource, watchedValues));
    }, [watchedValues, elementsSource]);
    const { defaultValues, validationSchema } = useMemo(() => {
        return generateFormSchemaAndDefaults({
            elementsSource,
            visibleElementsKeys,
            defaultFieldValues,
            defaultFieldStateMessages,
            customValidators,
            watchedValues,
        });
    }, [
        elementsSource,
        visibleElementsKeys,
        defaultFieldValues,
        defaultFieldStateMessages,
        customValidators,
        watchedValues,
    ]);
    const resolver = useYupValidationResolver(validationSchema);
    useEffect(() => {
        reset({ ...defaultValues, ...getValues() }, { keepValues: true });
    }, [defaultValues, validationSchema, reset, getValues]);
    if (!isHtmlNative) {
        control._options.resolver = resolver;
    }
    const handleFormSubmit = useCallback(async (data) => {
        if (!onSubmit)
            return;
        if (includeInactiveFieldsInSubmit) {
            await onSubmit(data);
        }
        else {
            const filtered = Object.fromEntries(visibleElementsKeys.map((key) => [key, data[key]]));
            await onSubmit(filtered);
        }
    }, [onSubmit, includeInactiveFieldsInSubmit, visibleElementsKeys]);
    const formContent = visibleElementsKeys.map((key, index) => {
        const field = elementsSource[key];
        const type = field['#type'];
        const isLayout = isLayoutType(type);
        return (_jsx(FormFieldRendered, { fieldKey: key, index: index, field: field, components: components, isMultiStep: isMultiStep, classNamePrefix: classNamePrefix, unstyled: unstyled, disableActionButtonWhenInvalid: disableActionButtonWhenInvalid, validationMode: validationMode, ...(isLayout ? { watchedValues } : {}) }, key));
    });
    const FormComponent = components?.form ?? Form;
    return (_jsx(FormProvider, { ...methods, children: _jsx(FormComponent, { validationMode: validationMode, onSubmit: handleSubmit(handleFormSubmit), disableActionButtonWhenInvalid: disableActionButtonWhenInvalid, children: formContent }) }));
};
export default React.memo(FormDefault);
