'use client'

import styles from './formMultiStep.module.scss'
import React, { useEffect, useMemo, useCallback, useState } from 'react'
import {
  TWebform,
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired, useForm, useWatch } from 'react-hook-form'
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
} from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import { getVisibleStepKeys } from '@/lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
}

type TFormMultiStep = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  multiStepExtra?: TMultiStepExtra
  elementsSource: Record<string, any>
  valueFormat: Required<TWebformValueFormat>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  classNames: Required<TWebformClassNames>
  components?: any
  yup: {
    yupUseFormProps?: Record<string, any>
  }
}

const FormMultiStep = ({
  elementsSource,
  multiStepExtra,
  valueFormat,
  defaultFieldValues,
  yup: yupObj,
  defaultFieldStateMessages,
  components,
  classNames,
}: TFormMultiStep) => {
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

  const visibleElementsKeys = useMemo(
    () =>
      currentFieldKeys.filter((key) =>
        shouldFieldBeVisible(
          key,
          currentStepObj,
          watchedStepValues,
          valueFormat
        )
      ),
    [currentFieldKeys, currentStepObj, valueFormat, watchedStepValues]
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

  const onFormSubmit = useCallback(
    async (data: typeof defaultValues) => {
      // 1. Récupère les noms de tous les champs visibles sur toutes les étapes affichées
      const visibleFieldNames = visibleStepKeys.flatMap((stepKey) => {
        const stepObj = elementsSource[stepKey]
        return Object.keys(stepObj).filter(
          (key) =>
            !key.startsWith('#') &&
            typeof stepObj[key] === 'object' &&
            Boolean(stepObj[key]['#type'])
        )
      })

      // 2. Ne garde que ces champs-là dans le data final
      const filteredData = Object.fromEntries(
        Object.entries(getValues()).filter(([k]) =>
          visibleFieldNames.includes(k)
        )
      )

      if (stepIndex < visibleStepKeys.length - 1) {
        setStepIndex((idx) => idx + 1)
      } else {
        console.log('SUBMIT FINAL DATA', filteredData)
        // ...submit filteredData au back
      }
    },
    [stepIndex, visibleStepKeys, elementsSource, getValues]
  )

  const goPrev = () => setStepIndex((idx) => Math.max(idx - 1, 0))

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

export type { TMultiStepExtra }
FormMultiStep.whyDidYouRender = true
export default React.memo(FormMultiStep)
