'use client'

import styles from './formMultiStep.module.scss'
import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions'
import FormFieldRendered from '../formDefault/formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
  TDependentField,
} from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import MultiStepActions from './multiStepActions/multiStepActions'
import MultiStepStepper from './multiStepStepper/multiStepStepper'
import {
  getAllFieldNames,
  getDummyDefaultMultiStep,
  getAllDefaultValuesFromAllSteps,
} from '../../../lib/functions/webform_multistep_functions/webform_multistep_functions'
import {
  getAllVisibleFieldNames,
  getVisibleStepKeys,
} from '../../../lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'
import { TFormMultiStepProps } from '../../../lib/types/components/formMultiStep'
import { MultiStepProvider } from './multiStepContext'

const FormMultiStep = ({
  elementsSource,
  valueFormat,
  defaultFieldValues,
  yup: yupObj,
  defaultFieldStateMessages,
  components,
  classNames,
  onSubmit,
  includeInactiveFieldsInSubmit,
  customValidators,
}: TFormMultiStepProps) => {
  console.log('elements Source', elementsSource)
  const stepKeys: string[] = useMemo(
    () => Object.keys(elementsSource),
    [elementsSource]
  )
  const allFieldNames = useMemo(
    () => getAllFieldNames(elementsSource),
    [elementsSource]
  )

  const dummyDefaultValues = useMemo(
    () => getDummyDefaultMultiStep(elementsSource),
    [elementsSource]
  )

  const { yupUseFormProps } = yupObj || {}

  const methods = useForm({
    ...yupUseFormProps,
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
  })

  const { handleSubmit, control, reset, getValues } = methods

  const watchedValuesArray = useWatch({ control, name: allFieldNames })
  const watchedValuesAllFields: Record<string, any> = useMemo(() => {
    return allFieldNames.reduce<Record<string, any>>((acc, key, i) => {
      acc[key] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, allFieldNames])

  const visibleStepKeys = useMemo(
    () =>
      getVisibleStepKeys(
        stepKeys,
        elementsSource,
        watchedValuesAllFields,
        valueFormat
      ),
    [elementsSource, stepKeys, watchedValuesAllFields, valueFormat]
  )

  const [stepIndex, setStepIndex] = useState<number>(0)
  const [allWatchedSteps, setAllWatchedSteps] = useState<Record<string, any>>(
    {}
  )

  useEffect(() => {
    if (stepIndex > visibleStepKeys.length - 1) {
      setStepIndex(visibleStepKeys.length - 1)
    }
  }, [visibleStepKeys, stepIndex])

  const currentStepKey = visibleStepKeys[stepIndex]
  const currentStepObj = elementsSource[currentStepKey]
  const previousButtonLabel = currentStepObj?.['#prev_button_label']
  const nextButtonLabel = currentStepObj?.['#next_button_label']

  const currentFieldKeys = useMemo(
    () =>
      Object.keys(currentStepObj).filter(
        (key) =>
          !key.startsWith('#') &&
          typeof currentStepObj[key] === 'object' &&
          Boolean(currentStepObj[key]['#type'])
      ),
    [currentStepObj]
  )

  const dependentFields: TDependentField[] = useMemo(
    () => getDependentFields(currentStepObj),
    [currentStepObj]
  )
  const dependentFieldNames = useMemo(
    () => dependentFields.map((dep) => dep.name),
    [dependentFields]
  )
  const watchedStepValuesArray = useWatch({
    control,
    name: dependentFieldNames,
  })
  const watchedStepValues = useMemo(() => {
    return dependentFields.reduce<Record<string, any>>((acc, key, i) => {
      acc[key.name] = watchedStepValuesArray?.[i]
      return acc
    }, {})
  }, [watchedStepValuesArray, dependentFields])

  const watchedStepValuesGlobal = useMemo(
    () => ({ ...allWatchedSteps, ...watchedStepValues }),
    [allWatchedSteps, watchedStepValues]
  )

  const visibleElementsKeys = useMemo(
    () =>
      currentFieldKeys.filter((key) =>
        shouldFieldBeVisible(
          key,
          currentStepObj,
          watchedStepValuesGlobal,
          valueFormat
        )
      ),
    [currentFieldKeys, currentStepObj, valueFormat, watchedStepValuesGlobal]
  )

  console.log('visible ELements Keys', visibleElementsKeys)

  const allDefaultValues = useMemo(
    () =>
      getAllDefaultValuesFromAllSteps({
        elementsSource,
        valueFormat,
        defaultFieldValues,
        defaultFieldStateMessages,
      }),
    [elementsSource, valueFormat, defaultFieldValues, defaultFieldStateMessages]
  )

  const { defaultValues, validationSchema } = useMemo(() => {
    return generateFormSchemaAndDefaults({
      elementsSource: currentStepObj,
      visibleElementsKeys,
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
      customValidators,
    })
  }, [
    currentStepObj,
    visibleElementsKeys,
    valueFormat,
    defaultFieldValues,
    defaultFieldStateMessages,
  ])

  const resolver = useYupValidationResolver(validationSchema)
  control._options.resolver = resolver

  useEffect(() => {
    reset({ ...defaultValues, ...getValues() }, { keepValues: true })
  }, [defaultValues, validationSchema])

  const onFormSubmit = useCallback(async () => {
    const allCurrentValues = getValues()
    const visibleFieldNames = getAllVisibleFieldNames(
      visibleStepKeys,
      elementsSource,
      watchedValuesAllFields,
      valueFormat
    )

    let dataToSend: Record<string, any> = {}
    if (includeInactiveFieldsInSubmit) {
      dataToSend = Object.fromEntries(
        Object.keys(allDefaultValues).map((fieldName) => [
          fieldName,
          visibleFieldNames.includes(fieldName)
            ? allCurrentValues[fieldName]
            : allDefaultValues[fieldName],
        ])
      )
    } else {
      dataToSend = Object.fromEntries(
        visibleFieldNames.map((fieldName) => [
          fieldName,
          allCurrentValues[fieldName],
        ])
      )
    }

    if (onSubmit) await onSubmit(dataToSend)
  }, [
    visibleStepKeys,
    elementsSource,
    getValues,
    watchedValuesAllFields,
    valueFormat,
    allDefaultValues,
    onSubmit,
  ])

  return (
    <FormProvider {...methods}>
      <MultiStepProvider
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        totalSteps={visibleStepKeys.length}
        allWatchedSteps={allWatchedSteps}
        setAllWatchedSteps={setAllWatchedSteps}
        watchedStepValues={watchedStepValues}
      >
        <MultiStepStepper
          components={components}
          currentStepObj={currentStepObj}
          classNames={classNames}
        />

        <form
          className={styles.formMultiStep}
          onSubmit={handleSubmit(onFormSubmit)}
        >
          {visibleElementsKeys.map((key, index) => (
            <FormFieldRendered
              key={key}
              fieldKey={key}
              index={index}
              field={currentStepObj[key]}
              valueFormat={valueFormat}
              components={components}
              classNames={classNames}
              isMultiStep={true}
            />
          ))}
          <MultiStepActions
            previousButtonLabel={previousButtonLabel}
            nextButtonLabel={nextButtonLabel}
            components={components}
            classNames={classNames}
          />
        </form>
      </MultiStepProvider>
    </FormProvider>
  )
}

FormMultiStep.whyDidYouRender = true
export default React.memo(FormMultiStep)
