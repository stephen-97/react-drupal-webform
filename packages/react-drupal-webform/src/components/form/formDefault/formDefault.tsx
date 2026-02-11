import React, { useEffect, useMemo, useCallback } from 'react'
import { useForm, useWatch, FormProvider } from 'react-hook-form'
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions'
import FormFieldRendered from './formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
  TDependentField,
  isLayoutType,
  isMarkupType,
} from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import { IFormDefaultWebformProps } from '../../../lib/types/components/formDefault'
import { getDummyDefaultFormDefault } from '../../../lib/functions/webform_validation_functions/webform_validation_functions'
import Form from '../form'

const FormDefault = (props: IFormDefaultWebformProps) => {
  const {
    elementsSource,
    multiStepExtra,
    defaultFieldValues,
    rhfDefaultFieldStateMessages,
    components,
    includeInactiveFieldsInSubmit,
    onSubmit,
    rhfCustomValidators,
    classNamePrefix,
    unstyled = false,
    rhfValidationMode = 'all',
    validationEngine = 'html',
    disableActionButtonWhenInvalid = false,
    className,
    id,
  } = props

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
    () => getDummyDefaultFormDefault(elementsSource, defaultFieldValues),
    [elementsSource]
  )

  const methods = useForm({
    mode: rhfValidationMode,
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
    shouldUnregister: false,
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
      shouldFieldBeVisible(key, elementsSource, watchedValues)
    )
  }, [watchedValues, elementsSource])

  const { defaultValues, validationSchema } = useMemo(() => {
    return generateFormSchemaAndDefaults({
      elementsSource,
      visibleElementsKeys,
      defaultFieldValues,
      rhfDefaultFieldStateMessages,
      rhfCustomValidators,
      watchedValues,
    })
  }, [
    elementsSource,
    visibleElementsKeys,
    defaultFieldValues,
    rhfDefaultFieldStateMessages,
    rhfCustomValidators,
    watchedValues,
  ])

  const resolver = useYupValidationResolver(validationSchema)

  useEffect(() => {
    reset({ ...defaultValues, ...getValues() }, { keepValues: true })
  }, [defaultValues, validationSchema, reset, getValues])

  if (validationEngine !== 'html') {
    control._options.resolver = resolver
  }

  const handleFormSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (!onSubmit) return

      if (includeInactiveFieldsInSubmit) {
        await onSubmit(data)
        return
      }

      const filtered = Object.fromEntries(
        visibleElementsKeys
          .filter((key) => {
            const type = elementsSource[key]?.['#type']

            return !(isLayoutType(type) || isMarkupType(type))
          })
          .map((key) => [key, data[key]])
      )

      await onSubmit(filtered)
    },
    [onSubmit, includeInactiveFieldsInSubmit, visibleElementsKeys]
  )

  const formContent = visibleElementsKeys.map((key, index) => {
    const field = elementsSource[key]
    const type = field['#type']

    const isLayout = isLayoutType(type)

    return (
      <FormFieldRendered
        key={key}
        fieldKey={key}
        index={index}
        field={field}
        components={components}
        isMultiStep={isMultiStep}
        classNamePrefix={classNamePrefix}
        unstyled={unstyled}
        validationEngine={validationEngine}
        disableActionButtonWhenInvalid={disableActionButtonWhenInvalid}
        {...(isLayout ? { watchedValues } : {})}
      />
    )
  })

  const FormComponent = components?.form ?? Form

  return (
    <FormProvider {...methods}>
      <FormComponent
        className={className}
        id={id}
        validationEngine={validationEngine}
        onSubmit={handleSubmit(handleFormSubmit)}
        disableActionButtonWhenInvalid={disableActionButtonWhenInvalid}
      >
        {formContent}
      </FormComponent>
    </FormProvider>
  )
}

export default React.memo(FormDefault)
