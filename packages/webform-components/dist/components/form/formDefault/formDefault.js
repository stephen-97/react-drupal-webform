'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import styles from './formDefault.module.scss';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useYupValidationResolver } from "../../../lib/functions/webform_yup_functions/webform_yup_functions";
import FormFieldRendered from "./formFieldRendered";
import { generateFormSchemaAndDefaults, getDependentFields, shouldFieldBeVisible, } from "../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions";
const FormDefault = ({ elementsSource, multiStepExtra, valueFormat, defaultFieldValues, yup: yupObj, defaultFieldStateMessages, components, classNames, includeInactiveFieldsInSubmit, onSubmit, customValidators, }) => {
    const { yupUseFormProps } = yupObj || {};
    const isMultiStep = Boolean(multiStepExtra);
    const dependentFields = useMemo(() => getDependentFields(elementsSource), [elementsSource]);
    const dependentFieldNames = useMemo(() => dependentFields.map((dep) => dep.name), [dependentFields]);
    const dummyDefaultValues = useMemo(() => {
        const allDefaults = {};
        Object.keys(elementsSource).forEach((key) => {
            allDefaults[key] = '';
        });
        return allDefaults;
    }, [elementsSource]);
    const { handleSubmit, formState, control, reset, getValues } = useForm({
        ...yupUseFormProps,
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: dummyDefaultValues,
    });
    const watchedValuesArray = useWatch({ control, name: dependentFieldNames });
    const watchedValues = useMemo(() => {
        return dependentFields.reduce((acc, key, i) => {
            acc[key.name] = watchedValuesArray === null || watchedValuesArray === void 0 ? void 0 : watchedValuesArray[i];
            return acc;
        }, {});
    }, [watchedValuesArray, dependentFields]);
    const visibleElementsKeys = useMemo(() => {
        return Object.keys(elementsSource).filter((key) => shouldFieldBeVisible(key, elementsSource, watchedValues, valueFormat));
    }, [watchedValues, elementsSource, valueFormat]);
    const { defaultValues, validationSchema } = useMemo(() => {
        return generateFormSchemaAndDefaults({
            elementsSource,
            visibleElementsKeys,
            valueFormat,
            defaultFieldValues,
            defaultFieldStateMessages,
            customValidators,
        });
    }, [
        elementsSource,
        visibleElementsKeys,
        valueFormat,
        defaultFieldValues,
        defaultFieldStateMessages,
    ]);
    const resolver = useYupValidationResolver(validationSchema);
    useEffect(() => {
        reset({ ...defaultValues, ...getValues() }, { keepValues: true });
    }, [defaultValues, validationSchema]);
    control._options.resolver = resolver;
    const elementsKeysToRender = useMemo(() => {
        return visibleElementsKeys;
    }, [elementsSource, visibleElementsKeys]);
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
    return (_jsx("form", { className: styles.formDefault, onSubmit: handleSubmit(handleFormSubmit), children: elementsKeysToRender.map((key, index) => (_jsx(FormFieldRendered, { fieldKey: key, control: control, index: index, field: elementsSource[key], valueFormat: valueFormat, components: components, formState: formState, classNames: classNames, isMultiStep: isMultiStep }, key))) }));
};
FormDefault.whyDidYouRender = true;
export default React.memo(FormDefault);
//# sourceMappingURL=formDefault.js.map