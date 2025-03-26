'use client'

import styles from './formDefault.module.scss'
import React, { useEffect, useMemo } from 'react'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import { TYup } from '@/components/webform/webform'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
  useForm: {
    handleSubmit: any
    formState: any
    control: any
    setError: any
  }
}

type TFormTypeName = 'default' | 'newsletter'

interface IForm {
  formType?: {
    name: TFormTypeName
    extra?: {
      newsletterProcessed: string
    }
  }
  onSubmit?: (_formValues: any) => void
  submitButtonRef?: React.RefObject<HTMLButtonElement>
  fieldVisibility?: any
  onValidationChange?: (_isValid: boolean) => void
  confirmationPath?: string
  elements: any
  multiStepExtra?: TMultiStepExtra
  className?: string
  yup: TYup
}

const FormDefault = ({
  formType = {
    name: 'default',
  },
  elements,
  className = '',
  onSubmit,
  multiStepExtra,
  submitButtonRef: externalSubmitButtonRef,
  onValidationChange,
  confirmationPath,
  fieldVisibility,
  yup,
}: IForm) => {
  const submitButtonRef = React.useRef<HTMLButtonElement>(null)
  const isMultiStep = Boolean(multiStepExtra)
  const { defaultValues, yupObject, yupReturn } = yup

  const elementsObject = useMemo(
    () => FormMappingFields(),
    [elements, submitButtonRef]
  )

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    setError,
    getValues,
  } = yupReturn

  Object.keys(elements).forEach((key) => {
    const type: string = elements[key]['#type']
    const field = elements[key]
    const visibility = true
    return elementsObject[type ?? 'default']?.validator?.({
      yupObject,
      defaultValues,
      key,
      field,
      visibility,
    })
  })

  const onFormSubmit = async (data: typeof defaultValues) => {}

  useEffect(() => {
    if (externalSubmitButtonRef?.current) {
      externalSubmitButtonRef.current.disabled = !isValid
      //onValidationChange(isValid)
    }
  }, [isValid, externalSubmitButtonRef])

  return (
    <form className={styles.formDefault} onSubmit={handleSubmit(onFormSubmit)}>
      {Object.keys(elements).map((key, index) => {
        return elementsObject[elements[key]['#type'] ?? 'default']?.element({
          control,
          index,
          key,
          keyForMap: `${elements[key]?.['#title']}-${multiStepExtra?.step}-${index}`,
          field: elements[key],
          submitButtonRef: submitButtonRef,
          formTypeName: formType?.name,
          isValid,
          isMultiStep,
        })
      })}

      {externalSubmitButtonRef && (
        <button type="submit" ref={externalSubmitButtonRef}></button>
      )}
      {errors.root?.message && (
        <div className={'body--default field-error'}>{errors.root.message}</div>
      )}
    </form>
  )
}

export type { TMultiStepExtra, IForm, TFormTypeName }
export default React.memo(FormDefault)
