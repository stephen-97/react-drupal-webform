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

  const {
    handleSubmit,
    formState: { isValid },
    control,
    reset,
    getValues,
  } = useForm({
    ...yupUseFormProps,
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
  })

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

  // ⬇️ Stocke le merge progressif des watchedStepValues de toutes les étapes précédentes
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

  // Champs dépendants (pour l'étape actuelle)
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

  // ⬇️ Merge de toutes les watched des steps précédents + celles de la step actuelle
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

  const onFormSubmit = useCallback(
    async (data: typeof allDefaultValues) => {
      const allCurrentValues = getValues()
      const visibleFieldNames = getAllVisibleFieldNames(
        visibleStepKeys,
        elementsSource,
        watchedValuesAllFields,
        valueFormat
      )

      let dataToSend: Record<string, any> = {}

      if (/* mets ici ton booléen (genre filterHiddenFieldsOnSubmit) */ true) {
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

      if (stepIndex < visibleStepKeys.length - 1) {
        goNext()
      } else {
        console.log('SUBMIT FINAL DATA', dataToSend)
      }
    },
    [
      stepIndex,
      visibleStepKeys,
      elementsSource,
      getValues,
      watchedValuesAllFields,
      valueFormat,
      allDefaultValues,
      goNext,
    ]
  )

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
            isValid={isValid}
            valueFormat={valueFormat}
            components={components}
            classNames={classNames}
            isMultiStep={true}
          />
        ))}
        <MultiStepActions
          step={stepIndex}
          totalSteps={visibleStepKeys.length}
          goPrev={goPrev}
          previousButtonLabel={previousButtonLabel}
          nextButtonLabel={nextButtonLabel}
          isStepValid={isValid}
          components={components}
          classNames={classNames}
        />
      </form>
    </div>
  )
}

FormMultiStep.whyDidYouRender = true
export default React.memo(FormMultiStep)
