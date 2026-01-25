import { getWebformProperties } from '../lib/functions/webform_functions'
import FormDefault from './form/formDefault/formDefault'
import { TWebform, TWebformNormalizedStateMessages } from '../lib/types/form.d'
import { TDeepRequiredClassNames } from '../lib/types/deepRequired'
import {
  defaultValuesClassnames,
  defaultValuesFieldStateMessages,
  defaultValuesObj,
} from '../lib/const/const.form'
import { mergeObjects } from '../lib/functions/utils_functions'
import { UseFormProps } from 'react-hook-form'
import { useMemo } from 'react'
import FormMultiStep from './form/formMultiStep/formMultiStep'
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions'

const Webform = ({
  elementsSource,
  defaultFieldValues = {},
  classNames = {},
  defaultFieldStateMessages = {},
  components = {},
  onSubmit,
  includeInactiveFieldsInSubmit = true,
  customValidators,
  isSubmitted,
  showConfirmation = true,
  classNamePrefix,
  unstyled = false,
}: TWebform) => {
  const yupUseFormProps: UseFormProps = {
    mode: 'onChange',
    reValidateMode: 'onBlur',
  }

  const mergedDefaultFieldValues = useMemo(
    () => ({
      ...defaultFieldValues,
      ...defaultValuesObj,
    }),
    [defaultFieldValues]
  )

  const mergedDefaultValuesStateMessages =
    useMemo<TWebformNormalizedStateMessages>(() => {
      return normalizeStateMessages(
        defaultFieldStateMessages,
        defaultValuesFieldStateMessages
      )
    }, [defaultFieldStateMessages])

  const mergedClassNames: TDeepRequiredClassNames = useMemo(
    () =>
      mergeObjects(
        defaultValuesClassnames,
        classNames
      ) as TDeepRequiredClassNames,
    [classNames]
  )

  const { isMultiStep, elementsSources } = getWebformProperties(elementsSource)

  const FormComponent = isMultiStep ? FormMultiStep : FormDefault

  const formProps = {
    yup: { yupUseFormProps },
    elementsSource: elementsSources,
    defaultFieldValues: mergedDefaultFieldValues,
    defaultFieldStateMessages: mergedDefaultValuesStateMessages,
    classNames: mergedClassNames,
    components,
    onSubmit,
    includeInactiveFieldsInSubmit,
    customValidators,
    isSubmitted,
    showConfirmation,
    classNamePrefix,
    unstyled,
  }

  return elementsSource ? <FormComponent {...formProps} /> : null
}

export default Webform
