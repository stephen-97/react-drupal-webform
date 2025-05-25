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
  const { yupUseFormProps } = yupObj
  const isMultiStep = Boolean(multiStepExtra)

  const defaultValues: Record<string, any> = {}
  const yupObject: Record<string, any> = {}

  const dependentFields = useMemo(() => {
    return getDependentFields(elementsSource)
  }, [elementsSource])

  Object.keys(elementsSource).forEach((key) => {
    const field = elementsSource[key]
    const type: TDrupal_FieldType = field['#type']
    const required = field?.['#required']
    const requiredMessage = formatMessage(
      getRequiredMessage(defaultFieldStateMessages, type) ?? '',
      field?.['#title']
    )
    const errorMessage = formatMessage(
      getErrorMessage(defaultFieldStateMessages, type) ?? '',
      field?.['#title']
    )
    if (
      type !== 'select' &&
      type !== 'webform_actions' &&
      type !== 'textfield' &&
      type !== 'checkboxes' &&
      type !== 'managed_file' &&
      type !== 'radios'
    ) {
      return
    }

    // Appliquer defaultValues / validation même si invisible (RHForm a besoin de tout dès le départ)
    FormMappingFields[type ?? 'default']?.validator?.({
      yupObject,
      defaultValues,
      key,
      field,
      required: Boolean(required),
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
      requiredMessage,
      errorMessage,
    })
  })

  const yupSchema = useMemo(() => yup.object(yupObject), [yupObject])
  const resolver = useYupValidationResolver(yupSchema)

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm({
    ...yupUseFormProps,
    defaultValues,
    resolver,
  })

  const watchedValuesArray = useWatch({ control, name: dependentFields })

  const watchedValues = useMemo(() => {
    return dependentFields.reduce<Record<string, any>>((acc, key, i) => {
      acc[key] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, dependentFields])

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
      {Object.keys(elementsSource).map((key, index) => {
        if (!shouldFieldBeVisible(key, elementsSource, watchedValues))
          return null

        return (
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
        )
      })}
      {externalSubmitButtonRef && (
        <button type="submit" ref={externalSubmitButtonRef}></button>
      )}
    </form>
  )
}

export type { TMultiStepExtra }

FormDefault.whyDidYouRender = true
export default React.memo(FormDefault)
