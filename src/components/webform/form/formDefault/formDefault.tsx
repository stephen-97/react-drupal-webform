'use client'

import styles from './formDefault.module.scss'
import React, { useEffect, useMemo, useRef, useCallback } from 'react'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import {
  TWebform,
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired, useForm, useWatch } from 'react-hook-form'
import { useYupValidationResolver } from '@/lib/functions/webform_yup_functions/webform_yup_functions'
import * as yup from 'yup'
import {
  formatMessage,
  getErrorMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import FormFieldRendered from '@/components/webform/form/formDefault/formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
} from '@/lib/functions/webform_fields_functions/webform_fields_conditional_functions'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
}

type TFormDefault = Omit<
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

const FormDefault = ({
  elementsSource,
  multiStepExtra,
  valueFormat,
  defaultFieldValues,
  yup: yupObj,
  submitButtonRef: externalSubmitButtonRef,
  defaultFieldStateMessages,
  components,
  classNames,
}: TFormDefault) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const { yupUseFormProps } = yupObj || {}
  const isMultiStep = Boolean(multiStepExtra)

  const dependentFields = useMemo(
    () => getDependentFields(elementsSource),
    [elementsSource]
  )

  const dummyDefaultValues = useMemo(() => {
    const allDefaults: Record<string, any> = {}
    Object.keys(elementsSource).forEach((key) => {
      allDefaults[key] = ''
    })
    return allDefaults
  }, [elementsSource])

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

  const watchedValuesArray = useWatch({ control, name: dependentFields })

  const watchedValues = useMemo(() => {
    return dependentFields.reduce<Record<string, any>>((acc, key, i) => {
      acc[key] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, dependentFields])

  const visibleElementsKeys = useMemo(() => {
    return Object.keys(elementsSource).filter((key) =>
      shouldFieldBeVisible(key, elementsSource, watchedValues)
    )
  }, [watchedValues, elementsSource])

  const { defaultValues, validationSchema } = useMemo(() => {
    return generateFormSchemaAndDefaults({
      elementsSource,
      visibleElementsKeys,
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
    })
  }, [
    elementsSource,
    visibleElementsKeys,
    valueFormat,
    defaultFieldValues,
    defaultFieldStateMessages,
  ])

  const resolver = useYupValidationResolver(validationSchema)

  useEffect(() => {
    reset({ ...defaultValues, ...getValues() }, { keepValues: true })
  }, [defaultValues, validationSchema])

  control._options.resolver = resolver

  const onFormSubmit = useCallback(async (data: typeof defaultValues) => {
    console.log('data', data)
  }, [])

  useEffect(() => {
    if (externalSubmitButtonRef?.current) {
      externalSubmitButtonRef.current.disabled = !isValid
    }
  }, [isValid, externalSubmitButtonRef])

  return (
    <form className={styles.formDefault} onSubmit={handleSubmit(onFormSubmit)}>
      {visibleElementsKeys.map((key, index) => (
        <FormFieldRendered
          key={key}
          fieldKey={key}
          control={control}
          index={index}
          field={elementsSource[key]}
          isValid={isValid}
          valueFormat={valueFormat}
          components={components}
          classNames={classNames}
          submitButtonRef={submitButtonRef}
          isMultiStep={isMultiStep}
        />
      ))}
      {externalSubmitButtonRef && (
        <button
          type="submit"
          ref={externalSubmitButtonRef}
          style={{ display: 'none' }}
        />
      )}
    </form>
  )
}

export type { TMultiStepExtra }

FormDefault.whyDidYouRender = true
export default React.memo(FormDefault)
