import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useYupValidationResolver } from '../../../lib/functions/webform_yup_functions/webform_yup_functions'
import FormFieldRendered from '../formDefault/formFieldRendered'
import {
  generateFormSchemaAndDefaults,
  getDependentFields,
  shouldFieldBeVisible,
  TDependentField,
} from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import { RenderMultiStepActions } from './multiStepActions/multiStepActions'
import MultiStepStepper from './multiStepStepper/multiStepStepper'
import {
  getAllFieldNames,
  getDummyDefaultMultiStep,
  getAllDefaultValuesFromAllSteps,
} from '../../../lib/functions/webform_multistep_functions/webform_multistep_functions'
import {
  getAllVisibleFieldNames,
  getVisibleStepKeys,
} from '../../../lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'
import { TFormMultiStepProps } from '../../../lib/types/components/formMultiStep'
import { MultiStepProvider } from './multiStepContext'
import Form from '../form'

const FormMultiStep = (props: TFormMultiStepProps) => {
  const {
    elementsSource,
    defaultFieldValues,
    rhfDefaultFieldStateMessages,
    components,
    onSubmit,
    includeInactiveFieldsInSubmit,
    rhfCustomValidators,
    classNamePrefix,
    unstyled = false,
    rhfValidationMode = 'all',
    validationEngine = 'html',
    disableActionButtonWhenInvalid = false,
  } = props

  const totalSteps = Object.keys(elementsSource).length
  const isHtmlNative = validationEngine === 'html'

  const stepKeys: string[] = useMemo(
    () => Object.keys(elementsSource),
    [elementsSource]
  )
  const allFieldNames = useMemo(
    () => getAllFieldNames(elementsSource),
    [elementsSource]
  )

  const dummyDefaultValues = useMemo(
    () => getDummyDefaultMultiStep(elementsSource, defaultFieldValues),
    [elementsSource]
  )

  const methods = useForm({
    mode: rhfValidationMode,
    criteriaMode: 'all',
    defaultValues: dummyDefaultValues,
    shouldUnregister: true,
  })

  const { handleSubmit, control, reset, getValues } = methods

  const watchedValuesArray = useWatch({ control, name: allFieldNames })
  const watchedValuesAllFields: Record<string, any> = useMemo(() => {
    return allFieldNames.reduce<Record<string, any>>((acc, key, i) => {
      acc[key] = watchedValuesArray?.[i]
      return acc
    }, {})
  }, [watchedValuesArray, allFieldNames])

  const visibleStepKeys = useMemo(
    () => getVisibleStepKeys(stepKeys, elementsSource, watchedValuesAllFields),
    [elementsSource, stepKeys, watchedValuesAllFields]
  )

  const [stepIndex, setStepIndex] = useState<number>(0)
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

  const watchedStepValuesGlobal = useMemo(
    () => ({ ...allWatchedSteps, ...watchedStepValues }),
    [allWatchedSteps, watchedStepValues]
  )

  const visibleElementsKeys = useMemo(
    () =>
      currentFieldKeys.filter((key) =>
        shouldFieldBeVisible(key, currentStepObj, watchedStepValuesGlobal)
      ),
    [currentFieldKeys, currentStepObj, watchedStepValuesGlobal]
  )

  const allDefaultValues = useMemo(
    () =>
      getAllDefaultValuesFromAllSteps({
        elementsSource,
        defaultFieldValues,
        rhfDefaultFieldStateMessages,
      }),
    [elementsSource, defaultFieldValues, rhfDefaultFieldStateMessages]
  )

  const { defaultValues, validationSchema } = useMemo(() => {
    return generateFormSchemaAndDefaults({
      elementsSource: currentStepObj,
      visibleElementsKeys,
      defaultFieldValues,
      rhfDefaultFieldStateMessages,
      rhfCustomValidators,
      watchedValues: watchedStepValuesGlobal,
    })
  }, [
    currentStepObj,
    visibleElementsKeys,
    defaultFieldValues,
    rhfDefaultFieldStateMessages,
    rhfCustomValidators,
    watchedStepValuesGlobal,
  ])

  const resolver = useYupValidationResolver(validationSchema)

  if (!isHtmlNative) {
    control._options.resolver = resolver
  }

  useEffect(() => {
    reset({ ...defaultValues, ...getValues() }, { keepValues: true })
  }, [defaultValues, validationSchema])

  const onFormSubmit = useCallback(async () => {
    const allCurrentValues = getValues()
    const visibleFieldNames = getAllVisibleFieldNames(
      visibleStepKeys,
      elementsSource,
      watchedValuesAllFields
    )

    let dataToSend: Record<string, any> = {}
    if (includeInactiveFieldsInSubmit) {
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

    if (onSubmit) await onSubmit(dataToSend)
  }, [
    visibleStepKeys,
    elementsSource,
    getValues,
    watchedValuesAllFields,
    allDefaultValues,
    onSubmit,
    includeInactiveFieldsInSubmit,
  ])

  const formContent = (
    <>
      {visibleElementsKeys.map((key, index) => {
        const field = currentStepObj[key]
        const type = field['#type']

        const isLayout = [
          'webform_section',
          'webform_flexbox',
          'container',
          'details',
        ].includes(type)

        return (
          <FormFieldRendered
            key={key}
            fieldKey={key}
            index={index}
            field={field}
            components={components}
            classNamePrefix={classNamePrefix}
            isMultiStep={true}
            unstyled={unstyled}
            validationEngine={validationEngine}
            disableActionButtonWhenInvalid={disableActionButtonWhenInvalid}
            {...(isLayout ? { watchedValues: watchedStepValuesGlobal } : {})}
          />
        )
      })}

      <RenderMultiStepActions
        previousButtonLabel={previousButtonLabel}
        nextButtonLabel={nextButtonLabel}
        components={components}
        classNamePrefix={classNamePrefix}
        unstyled={unstyled}
        disableActionButtonWhenInvalid={disableActionButtonWhenInvalid}
      />
    </>
  )

  const FormComponent = components?.form ?? Form

  return (
    <FormProvider {...methods}>
      <MultiStepProvider
        elementsSource={elementsSource}
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        totalSteps={totalSteps}
        totalVisibleSteps={visibleStepKeys.length}
        allWatchedSteps={allWatchedSteps}
        currentStepKey={currentStepKey}
        setAllWatchedSteps={setAllWatchedSteps}
        watchedStepValues={watchedStepValues}
      >
        <MultiStepStepper
          components={components}
          currentStepObj={currentStepObj}
          classNamePrefix={classNamePrefix}
          elementsSource={elementsSource}
          unstyled={unstyled}
        />

        <FormComponent
          validationEngine={validationEngine}
          onSubmit={handleSubmit(onFormSubmit)}
          disableActionButtonWhenInvalid={disableActionButtonWhenInvalid}
        >
          {formContent}
        </FormComponent>
      </MultiStepProvider>
    </FormProvider>
  )
}

export default React.memo(FormMultiStep)
