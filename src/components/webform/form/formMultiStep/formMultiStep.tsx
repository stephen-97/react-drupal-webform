'use client'

import styles from './formMultiStep.module.scss'
import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useYupValidationResolver } from '@/lib/functions/webform_yup_functions/webform_yup_functions'
import FormFieldRendered from '@/components/webform/form/formDefault/formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
  TDependentField,
} from '@/lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import MultiStepActions from '@/components/webform/form/formMultiStep/multiStepActions/multiStepActions'
import MultiStepStepper from '@/components/webform/form/formMultiStep/multiStepStepper/multiStepStepper'
import {
  getAllFieldNames,
  getDummyDefaultMultiStep,
  getAllDefaultValuesFromAllSteps,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import {
  getAllVisibleFieldNames,
  getVisibleStepKeys,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'
import { TFormMultiStepProps } from '@/lib/types/components/formMultiStep'

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
}: TFormMultiStepProps) => {
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

  const { handleSubmit, formState, control, reset, getValues } = useForm({
    ...yupUseFormProps,
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
  })

  const { isValid } = formState

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
    () => ({
      ...allWatchedSteps,
      ...watchedStepValues,
    }),
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

  const goNext = () => {
    setAllWatchedSteps((prev) => ({ ...prev, ...watchedStepValues }))
    setStepIndex((idx) => idx + 1)
  }

  const goPrev = () => setStepIndex((idx) => Math.max(idx - 1, 0))

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
    if (onSubmit) {
      await onSubmit(dataToSend)
    }
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
    <div>
      <MultiStepStepper
        step={stepIndex}
        totalSteps={visibleStepKeys.length}
        isStepValid={isValid}
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
            control={control}
            index={index}
            field={currentStepObj[key]}
            valueFormat={valueFormat}
            components={components}
            classNames={classNames}
            isMultiStep={true}
            formState={formState}
          />
        ))}
        <MultiStepActions
          step={stepIndex}
          totalSteps={visibleStepKeys.length}
          formState={formState}
          previousButtonLabel={previousButtonLabel}
          nextButtonLabel={nextButtonLabel}
          components={components}
          classNames={classNames}
          buttonsOnClick={{
            prev: goPrev,
            next: goNext,
          }}
        />
      </form>
    </div>
  )
}

FormMultiStep.whyDidYouRender = true
export default React.memo(FormMultiStep)
