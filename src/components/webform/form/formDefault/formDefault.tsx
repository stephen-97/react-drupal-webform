'use client'

import styles from './formDefault.module.scss'
import React, { useEffect, useMemo } from 'react'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import { TWebform, TWebformValueFormat } from '@/lib/types/form'
import { useForm } from 'react-hook-form'
import { useYupValidationResolver } from '@/lib/functions/webform_yup_functions/webform_yup_functions'
import * as yup from 'yup'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
}

type TFormDefault = Omit<TWebform, 'elementsSource' | 'valueFormat'> & {
  submitButtonRef?: React.RefObject<HTMLButtonElement>
  multiStepExtra?: TMultiStepExtra
  elementsSource: Record<string, any>
  valueFormat: Required<TWebformValueFormat>
}

const FormDefault = ({
  elementsSource,
  multiStepExtra,
  valueFormat,
  yup: yupObj,
  submitButtonRef: externalSubmitButtonRef,
}: TFormDefault) => {
  const submitButtonRef = React.useRef<HTMLButtonElement>(null)
  const { yupUseFormProps } = yupObj
  const isMultiStep = Boolean(multiStepExtra)

  const elementsObject = useMemo(
    () => FormMappingFields(),
    [elementsSource, submitButtonRef]
  )

  const defaultValues = {}
  const yupObject = {}

  Object.keys(elementsSource).forEach((key) => {
    const type: string = elementsSource[key]['#type']
    const field = elementsSource[key]
    const visibility = true
    return elementsObject[type ?? 'default']?.validator?.({
      yupObject,
      defaultValues,
      key,
      field,
      visibility,
      valueFormat,
    })
  })

  const resolver = useYupValidationResolver(yup.object(yupObject))

  const {
    handleSubmit,
    formState: { isValid },
    control,
    setError,
    getValues,
  } = useForm({
    ...yupUseFormProps,
    resolver,
  })

  console.log(getValues())

  const onFormSubmit = async (data: typeof defaultValues) => {
    console.log(data)
  }

  useEffect(() => {
    if (externalSubmitButtonRef?.current) {
      externalSubmitButtonRef.current.disabled = !isValid
    }
  }, [isValid, externalSubmitButtonRef])

  return (
    <form className={styles.formDefault} onSubmit={handleSubmit(onFormSubmit)}>
      {Object.keys(elementsSource).map((key, index) => {
        const elementType = elementsSource[key]['#type'] ?? 'default'
        const elementRenderer = elementsObject[elementType]?.element
        if (elementRenderer) {
          return elementRenderer({
            control,
            index,
            key,
            keyForMap: `${elementsSource[key]?.['#title']}-${multiStepExtra?.step}-${index}`,
            field: elementsSource[key],
            submitButtonRef,
            isValid,
            valueFormat,
            isMultiStep,
          })
        }
      })}
      {externalSubmitButtonRef && (
        <button type="submit" ref={externalSubmitButtonRef}></button>
      )}
    </form>
  )
}

export type { TMultiStepExtra }
export default React.memo(FormDefault)
