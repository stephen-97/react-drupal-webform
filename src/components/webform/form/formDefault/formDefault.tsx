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
import { DeepRequired, useForm } from 'react-hook-form'
import { useYupValidationResolver } from '@/lib/functions/webform_yup_functions/webform_yup_functions'
import * as yup from 'yup'
import {
  formatMessage,
  getErrorMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { TElementSource } from '@/lib/types/components/field'

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

type FieldRendererProps = {
  control: any
  index: number
  fieldKey: string
  field: TElementSource
  isValid: boolean
  valueFormat: Required<TWebformValueFormat>
  components?: any
  classNames: Required<TWebformClassNames>
  submitButtonRef: React.RefObject<HTMLButtonElement>
  isMultiStep: boolean
}

const FieldRenderer = React.memo(
  ({
    control,
    index,
    fieldKey,
    field,
    isValid,
    valueFormat,
    components,
    classNames,
    submitButtonRef,
    isMultiStep,
  }: FieldRendererProps) => {
    const type: string = field['#type'] ?? 'default'

    // Filtrage ici aussi pour éviter rendus inutiles
    if (
      type !== 'select' &&
      type !== 'webform_actions' &&
      type !== 'textfield' &&
      type !== 'checkboxes' &&
      type !== 'managed_file' &&
      type !== 'radios'
    ) {
      return null
    }

    const elementRenderer = FormMappingFields[type]?.element

    if (!elementRenderer) return null

    return elementRenderer({
      control,
      index,
      key: fieldKey,
      keyForMap: fieldKey,
      field,
      submitButtonRef,
      isValid,
      valueFormat,
      isMultiStep,
      components,
      classNames,
    })
  },
  (prevProps, nextProps) => {
    // Comparaison personnalisée simple pour éviter rerender inutile
    const shouldRerender =
      prevProps.isValid !== nextProps.isValid ||
      prevProps.fieldKey !== nextProps.fieldKey ||
      prevProps.field['#type'] !== nextProps.field['#type'] ||
      prevProps.field['#required'] !== nextProps.field['#required']

    if (shouldRerender) {
      // console.log(`[FieldRenderer] rerender: ${nextProps.fieldKey}`)
    }

    return !shouldRerender
  }
)

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

  // Construire defaultValues et yupObject (schema)
  const defaultValues: Record<string, any> = {}
  const yupObject: Record<string, any> = {}

  Object.keys(elementsSource).forEach((key) => {
    const field = elementsSource[key]
    const type: string = field['#type']
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
      {Object.keys(elementsSource).map((key, index) => (
        <FieldRenderer
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
        <button type="submit" ref={externalSubmitButtonRef}></button>
      )}
    </form>
  )
}

export type { TMultiStepExtra }

FormDefault.whyDidYouRender = true
export default React.memo(FormDefault)
