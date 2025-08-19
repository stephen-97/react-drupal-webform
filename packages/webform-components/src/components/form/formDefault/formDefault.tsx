'use client'

import styles from './formDefault.module.scss'
import React, { useEffect, useMemo, useCallback } from 'react'
import { useForm, useWatch, FormProvider } from 'react-hook-form'
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions'
import FormFieldRendered from './formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
  TDependentField,
} from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import { IFormDefaultWebformProps } from '../../../lib/types/components/formDefault'
import { getDummyDefaultFormDefault } from '../../../lib/functions/webform_validation_functions/webform_validation_functions'

const FormDefault = ({
  elementsSource,
  multiStepExtra,
  valueFormat,
  defaultFieldValues,
  yup: yupObj,
  defaultFieldStateMessages,
  components,
  classNames,
  includeInactiveFieldsInSubmit,
  onSubmit,
  customValidators,
}: IFormDefaultWebformProps) => {
  const { yupUseFormProps } = yupObj || {}
  const isMultiStep = Boolean(multiStepExtra)

  const dependentFields: TDependentField[] = useMemo(
    () => getDependentFields(elementsSource),
    [elementsSource]
  )

  const dependentFieldNames = useMemo(
    () => dependentFields.map((dep) => dep.name),
    [dependentFields]
  )

  const dummyDefaultValues = useMemo(
    () => getDummyDefaultFormDefault(elementsSource),
    [elementsSource]
  )

  const methods = useForm({
    ...yupUseFormProps,
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
  })

  const { control, reset, getValues, handleSubmit } = methods

  const watchedValuesArray = useWatch({ control, name: dependentFieldNames })

  const watchedValues = useMemo(() => {
    return dependentFields.reduce<Record<string, any>>((acc, key, i) => {
      acc[key.name] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, dependentFields])

  const visibleElementsKeys = useMemo(() => {
    return Object.keys(elementsSource).filter((key) =>
      shouldFieldBeVisible(key, elementsSource, watchedValues, valueFormat)
    )
  }, [watchedValues, elementsSource, valueFormat])

  const { defaultValues, validationSchema } = useMemo(() => {
    return generateFormSchemaAndDefaults({
      elementsSource,
      visibleElementsKeys,
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
      customValidators,
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
  }, [defaultValues, validationSchema, reset, getValues])

  control._options.resolver = resolver

  const elementsKeysToRender = useMemo(() => {
    return visibleElementsKeys
  }, [elementsSource, visibleElementsKeys])

  const handleFormSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (!onSubmit) return

      if (includeInactiveFieldsInSubmit) {
        await onSubmit(data)
      } else {
        const filtered = Object.fromEntries(
          visibleElementsKeys.map((key) => [key, data[key]])
        )
        await onSubmit(filtered)
      }
    },
    [onSubmit, includeInactiveFieldsInSubmit, visibleElementsKeys]
  )

  return (
    <FormProvider {...methods}>
      <form
        className={styles.formDefault}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {elementsKeysToRender.map((key, index) => (
          <FormFieldRendered
            key={key}
            fieldKey={key}
            index={index}
            field={elementsSource[key]}
            valueFormat={valueFormat}
            components={components}
            classNames={classNames}
            isMultiStep={isMultiStep}
          />
        ))}
      </form>
    </FormProvider>
  )
}

FormDefault.whyDidYouRender = true
export default React.memo(FormDefault)
