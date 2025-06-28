'use client'

import styles from './formMultiStep.module.scss'
import stylesField from '../fields/field.module.scss'
import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react'
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
import cn from 'classnames'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
}

type TFormMultiStep = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  submitButtonRef?: React.RefObject<HTMLButtonElement>
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
  submitButtonRef: externalSubmitButtonRef,
  defaultFieldStateMessages,
  components,
  classNames,
}: TFormMultiStep) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const [step, setStep] = useState<number>(0)
  const stepKeys: string[] = Object.keys(elementsSource)
  const currentStepKey = stepKeys[step]
  const currentStepObj = elementsSource[currentStepKey]
  const previousButtonLabel = elementsSource[step]?.['#prev_button_label']
  const nextButtonLabel = elementsSource[step]?.['#next_button_label']

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

  const dummyDefaultValues = useMemo(() => {
    const allDefaults: Record<string, any> = {}
    stepKeys.forEach((stepKey) => {
      const stepObj = elementsSource[stepKey]
      Object.keys(stepObj).forEach((key) => {
        if (
          !key.startsWith('#') &&
          typeof stepObj[key] === 'object' &&
          Boolean(stepObj[key]['#type'])
        ) {
          allDefaults[key] = ''
        }
      })
    })
    return allDefaults
  }, [elementsSource, stepKeys])

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

  // Watch values for the current step (pour conditionnels)
  const watchedValuesArray = useWatch({ control, name: dependentFieldNames })
  const watchedValues = useMemo(() => {
    return dependentFields.reduce<Record<string, any>>((acc, key, i) => {
      acc[key.name] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, dependentFields])

  const visibleElementsKeys = useMemo(
    () =>
      currentFieldKeys.filter((key) =>
        shouldFieldBeVisible(key, currentStepObj, watchedValues, valueFormat)
      ),
    [currentFieldKeys, currentStepObj, valueFormat, watchedValues]
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

  // --- Submit multi step ---
  const onFormSubmit = useCallback(
    async (data: typeof defaultValues) => {
      if (step < stepKeys.length - 1) {
        setStep((s) => s + 1)
      } else {
        // Dernier step, soumets le form final (ou callback parent)
        console.log('SUBMIT FINAL DATA', getValues())
      }
    },
    [step, stepKeys, getValues]
  )

  // -- Option: désactive le bouton submit si invalide
  useEffect(() => {
    if (externalSubmitButtonRef?.current) {
      externalSubmitButtonRef.current.disabled = !isValid
    }
  }, [isValid, externalSubmitButtonRef])

  // -- Navigation manuelle (back)
  const goPrev = () => setStep((s) => Math.max(s - 1, 0))

  useEffect(() => {
    if (externalSubmitButtonRef?.current) {
      externalSubmitButtonRef.current.disabled = !isValid
    }
  }, [isValid, externalSubmitButtonRef])

  return (
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
          submitButtonRef={submitButtonRef}
          isMultiStep={true}
        />
      ))}
      <div className={styles.actions}>
        {step > 0 && (
          <button
            className={cn(stylesField.button, styles.button)}
            type="button"
            onClick={goPrev}
          >
            {previousButtonLabel?.length > 0 ? previousButtonLabel : 'prev'}
          </button>
        )}
        <button
          className={cn(stylesField.button, styles.button)}
          disabled={!isValid}
          type="submit"
        >
          {nextButtonLabel?.length > 0 ? nextButtonLabel : 'Next'}
        </button>
      </div>
    </form>
  )
}

export type { TMultiStepExtra }
FormMultiStep.whyDidYouRender = true
export default React.memo(FormMultiStep)
