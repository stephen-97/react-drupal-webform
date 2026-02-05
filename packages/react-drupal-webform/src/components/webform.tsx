import { getWebformProperties } from '../lib/functions/webform_functions'
import FormDefault from './form/formDefault/formDefault'
import { TWebform, TWebformNormalizedStateMessages } from '../lib/types/form'
import {
  defaultValuesFieldStateMessages,
  defaultValuesObj,
} from '../lib/const/const.form'
import { useMemo } from 'react'
import FormMultiStep from './form/formMultiStep/formMultiStep'
import { normalizeStateMessages } from '../lib/functions/webform-states-message-functions/webform-state-messages-functions'

const Webform = ({
  elementsSource,
  rhfDefaultFieldStateMessages = {},
  components = {},
  onSubmit,
  includeInactiveFieldsInSubmit = true,
  rhfCustomValidators,
  classNamePrefix,
  unstyled = false,
  rhfValidationMode = 'all',
  validationEngine = 'html',
  disableActionButtonWhenInvalid,
}: TWebform) => {
  const mergedDefaultFieldValues = useMemo(
    () => ({
      ...{},
      ...defaultValuesObj,
    }),
    []
  )

  const mergedDefaultValuesStateMessages =
    useMemo<TWebformNormalizedStateMessages>(() => {
      return normalizeStateMessages(
        rhfDefaultFieldStateMessages,
        defaultValuesFieldStateMessages
      )
    }, [rhfDefaultFieldStateMessages])

  const { isMultiStep, elementsSources } = getWebformProperties(elementsSource)

  const FormComponent = isMultiStep ? FormMultiStep : FormDefault

  const formProps = {
    elementsSource: elementsSources,
    defaultFieldValues: mergedDefaultFieldValues,
    rhfDefaultFieldStateMessages: mergedDefaultValuesStateMessages,
    components,
    onSubmit,
    includeInactiveFieldsInSubmit,
    rhfCustomValidators,
    classNamePrefix,
    unstyled,
    rhfValidationMode,
    validationEngine,
    disableActionButtonWhenInvalid,
  }

  return elementsSource ? <FormComponent {...formProps} /> : null
}

export default Webform
