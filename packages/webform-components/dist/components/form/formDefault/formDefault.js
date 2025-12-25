import { jsx as _jsx } from "react/jsx-runtime";
import styles from './formDefault.module.scss';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useForm, useWatch, FormProvider } from 'react-hook-form';
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions';
import FormFieldRendered from './formFieldRendered';
import { generateFormSchemaAndDefaults, getDependentFields, shouldFieldBeVisible, isLayoutType, } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
import { getDummyDefaultFormDefault } from '../../../lib/functions/webform_validation_functions/webform_validation_functions';
const FormDefault = ({ elementsSource, multiStepExtra, defaultFieldValues, yup: yupObj, defaultFieldStateMessages, components, classNames, includeInactiveFieldsInSubmit, onSubmit, customValidators, }) => {
    const { yupUseFormProps } = yupObj || {};
    const isMultiStep = Boolean(multiStepExtra);
    const dependentFields = useMemo(() => getDependentFields(elementsSource), [elementsSource]);
    const dependentFieldNames = useMemo(() => dependentFields.map((dep) => dep.name), [dependentFields]);
    const dummyDefaultValues = useMemo(() => getDummyDefaultFormDefault(elementsSource), [elementsSource]);
    const methods = useForm({
        ...yupUseFormProps,
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: dummyDefaultValues,
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
    control._options.resolver = resolver;
    const handleFormSubmit = useCallback(async (data) => {
        if (!onSubmit)
            return;
        console.log('data here', data);
        if (includeInactiveFieldsInSubmit) {
            await onSubmit(data);
        }
        else {
            const filtered = Object.fromEntries(visibleElementsKeys.map((key) => [key, data[key]]));
            await onSubmit(filtered);
        }
    }, [onSubmit, includeInactiveFieldsInSubmit, visibleElementsKeys]);
    console.log('visibleElementsKeys', visibleElementsKeys);
    return (_jsx(FormProvider, { ...methods, children: _jsx("form", { className: styles.formDefault, onSubmit: handleSubmit(handleFormSubmit), children: visibleElementsKeys.map((key, index) => {
                const field = elementsSource[key];
                const type = field['#type'];
                const isLayout = isLayoutType(type);
                return (_jsx(FormFieldRendered, { fieldKey: key, index: index, field: field, components: components, classNames: classNames, isMultiStep: isMultiStep, ...(isLayout ? { watchedValues } : {}) }, key));
            }) }) }));
};
FormDefault.whyDidYouRender = true;
export default React.memo(FormDefault);
