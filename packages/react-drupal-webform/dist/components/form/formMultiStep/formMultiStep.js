import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './formMultiStep.module.scss';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions';
import FormFieldRendered from '../formDefault/formFieldRendered';
import { generateFormSchemaAndDefaults, getDependentFields, shouldFieldBeVisible, } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
import MultiStepActions from './multiStepActions/multiStepActions';
import MultiStepStepper from './multiStepStepper/multiStepStepper';
import { getAllFieldNames, getDummyDefaultMultiStep, getAllDefaultValuesFromAllSteps, } from '../../../lib/functions/webform_multistep_functions/webform_multistep_functions';
import { getAllVisibleFieldNames, getVisibleStepKeys, } from '../../../lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions';
import { MultiStepProvider } from './multiStepContext';
const FormMultiStep = ({ elementsSource, defaultFieldValues, yup: yupObj, defaultFieldStateMessages, components, classNames, onSubmit, includeInactiveFieldsInSubmit, customValidators, }) => {
    const stepKeys = useMemo(() => Object.keys(elementsSource), [elementsSource]);
    const allFieldNames = useMemo(() => getAllFieldNames(elementsSource), [elementsSource]);
    const dummyDefaultValues = useMemo(() => getDummyDefaultMultiStep(elementsSource), [elementsSource]);
    const { yupUseFormProps } = yupObj || {};
    const methods = useForm({
        ...yupUseFormProps,
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: dummyDefaultValues,
    });
    const { handleSubmit, control, reset, getValues } = methods;
    const watchedValuesArray = useWatch({ control, name: allFieldNames });
    const watchedValuesAllFields = useMemo(() => {
        return allFieldNames.reduce((acc, key, i) => {
            acc[key] = watchedValuesArray?.[i];
            return acc;
        }, {});
    }, [watchedValuesArray, allFieldNames]);
    const visibleStepKeys = useMemo(() => getVisibleStepKeys(stepKeys, elementsSource, watchedValuesAllFields), [elementsSource, stepKeys, watchedValuesAllFields]);
    const [stepIndex, setStepIndex] = useState(0);
    const [allWatchedSteps, setAllWatchedSteps] = useState({});
    useEffect(() => {
        if (stepIndex > visibleStepKeys.length - 1) {
            setStepIndex(visibleStepKeys.length - 1);
        }
    }, [visibleStepKeys, stepIndex]);
    const currentStepKey = visibleStepKeys[stepIndex];
    const currentStepObj = elementsSource[currentStepKey];
    const previousButtonLabel = currentStepObj?.['#prev_button_label'];
    const nextButtonLabel = currentStepObj?.['#next_button_label'];
    const currentFieldKeys = useMemo(() => Object.keys(currentStepObj).filter((key) => !key.startsWith('#') &&
        typeof currentStepObj[key] === 'object' &&
        Boolean(currentStepObj[key]['#type'])), [currentStepObj]);
    const dependentFields = useMemo(() => getDependentFields(currentStepObj), [currentStepObj]);
    const dependentFieldNames = useMemo(() => dependentFields.map((dep) => dep.name), [dependentFields]);
    const watchedStepValuesArray = useWatch({
        control,
        name: dependentFieldNames,
    });
    const watchedStepValues = useMemo(() => {
        return dependentFields.reduce((acc, key, i) => {
            acc[key.name] = watchedStepValuesArray?.[i];
            return acc;
        }, {});
    }, [watchedStepValuesArray, dependentFields]);
    const watchedStepValuesGlobal = useMemo(() => ({ ...allWatchedSteps, ...watchedStepValues }), [allWatchedSteps, watchedStepValues]);
    const visibleElementsKeys = useMemo(() => currentFieldKeys.filter((key) => shouldFieldBeVisible(key, currentStepObj, watchedStepValuesGlobal)), [currentFieldKeys, currentStepObj, watchedStepValuesGlobal]);
    const allDefaultValues = useMemo(() => getAllDefaultValuesFromAllSteps({
        elementsSource,
        defaultFieldValues,
        defaultFieldStateMessages,
    }), [elementsSource, defaultFieldValues, defaultFieldStateMessages]);
    const { defaultValues, validationSchema } = useMemo(() => {
        return generateFormSchemaAndDefaults({
            elementsSource: currentStepObj,
            visibleElementsKeys,
            defaultFieldValues,
            defaultFieldStateMessages,
            customValidators,
            watchedValues: watchedStepValuesGlobal,
        });
    }, [
        currentStepObj,
        visibleElementsKeys,
        defaultFieldValues,
        defaultFieldStateMessages,
        customValidators,
        watchedStepValuesGlobal,
    ]);
    const resolver = useYupValidationResolver(validationSchema);
    control._options.resolver = resolver;
    useEffect(() => {
        reset({ ...defaultValues, ...getValues() }, { keepValues: true });
    }, [defaultValues, validationSchema]);
    const onFormSubmit = useCallback(async () => {
        const allCurrentValues = getValues();
        const visibleFieldNames = getAllVisibleFieldNames(visibleStepKeys, elementsSource, watchedValuesAllFields);
        let dataToSend = {};
        if (includeInactiveFieldsInSubmit) {
            dataToSend = Object.fromEntries(Object.keys(allDefaultValues).map((fieldName) => [
                fieldName,
                visibleFieldNames.includes(fieldName)
                    ? allCurrentValues[fieldName]
                    : allDefaultValues[fieldName],
            ]));
        }
        else {
            dataToSend = Object.fromEntries(visibleFieldNames.map((fieldName) => [
                fieldName,
                allCurrentValues[fieldName],
            ]));
        }
        if (onSubmit)
            await onSubmit(dataToSend);
    }, [
        visibleStepKeys,
        elementsSource,
        getValues,
        watchedValuesAllFields,
        allDefaultValues,
        onSubmit,
        includeInactiveFieldsInSubmit,
    ]);
    return (_jsx(FormProvider, { ...methods, children: _jsxs(MultiStepProvider, { stepIndex: stepIndex, setStepIndex: setStepIndex, totalSteps: visibleStepKeys.length, allWatchedSteps: allWatchedSteps, setAllWatchedSteps: setAllWatchedSteps, watchedStepValues: watchedStepValues, children: [_jsx(MultiStepStepper, { components: components, currentStepObj: currentStepObj, classNames: classNames }), _jsxs("form", { className: styles.formMultiStep, onSubmit: handleSubmit(onFormSubmit), children: [visibleElementsKeys.map((key, index) => {
                            const field = currentStepObj[key];
                            const type = field['#type'];
                            const isLayout = [
                                'webform_section',
                                'webform_flexbox',
                                'container',
                                'details',
                            ].includes(type);
                            return (_jsx(FormFieldRendered, { fieldKey: key, index: index, field: field, components: components, classNames: classNames, isMultiStep: true, ...(isLayout
                                    ? { watchedValues: watchedStepValuesGlobal }
                                    : {}) }, key));
                        }), _jsx(MultiStepActions, { previousButtonLabel: previousButtonLabel, nextButtonLabel: nextButtonLabel, components: components, classNames: classNames })] })] }) }));
};
FormMultiStep.whyDidYouRender = true;
export default React.memo(FormMultiStep);
