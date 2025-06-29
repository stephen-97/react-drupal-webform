import { getWebformProperties } from '@/lib/functions/webform_functions'
import { TMultiStepProperties } from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import {
  TWebform,
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import {
  defaultValueFormatObj,
  defaultValuesClassnames,
  defaultValuesFieldStateMessages,
  defaultValuesObj,
} from '@/lib/const/const.form'
import {
  deepMergeDefaults,
  mergeObjects,
} from '@/lib/functions/utils_functions'
import { DeepRequired } from 'react-hook-form'
import { useMemo } from 'react'
import FormMultiStep from '@/components/webform/form/formMultiStep/formMultiStep'

const Webform = ({
  elementsSource,
  confirmationPath,
  yup,
  valueFormat = {},
  defaultFieldValues = {},
  classNames = {},
  defaultFieldStateMessages = {},
  components,
}: TWebform) => {
  const { yupObject = {}, yupDefaultValues = {} } = yup

  const mergedValueFormat = useMemo(
    () => ({
      ...defaultValueFormatObj,
      ...valueFormat,
    }),
    [valueFormat]
  )

  const mergedDefaultFieldValues = useMemo(
    () => ({
      ...defaultFieldValues,
      ...defaultValuesObj,
    }),
    [defaultFieldValues]
  )

  const mergedDefaultValuesStateMessages = useMemo(
    () =>
      deepMergeDefaults(
        defaultValuesFieldStateMessages,
        defaultFieldStateMessages as Partial<TWebformStateMessages>
      ) as DeepRequired<TWebformStateMessages>,
    [defaultFieldStateMessages]
  )

  const mergedClassNames = useMemo(
    () =>
      mergeObjects(
        defaultValuesClassnames,
        classNames
      ) as Required<TWebformClassNames>,
    [classNames]
  )

  const { isMultiStep, elementsSources, multiStepExtra } =
    getWebformProperties(elementsSource)

  const Form = () => {
    if (isMultiStep) {
      //const { only_steps_elements, only_action_element } =
      //         multiStepExtra as TMultiStepProperties
      return (
        <FormMultiStep
          yup={{ ...yup, yupObject, yupDefaultValues }}
          confirmationPath={'/'}
          elementsSource={elementsSources}
          valueFormat={mergedValueFormat}
          defaultFieldValues={mergedDefaultFieldValues}
          defaultFieldStateMessages={mergedDefaultValuesStateMessages}
          classNames={mergedClassNames}
          components={components}
        />
      )
    }

    return (
      <FormDefault
        yup={{ ...yup, yupObject, yupDefaultValues }}
        confirmationPath={'/'}
        elementsSource={elementsSources}
        valueFormat={mergedValueFormat}
        defaultFieldValues={mergedDefaultFieldValues}
        defaultFieldStateMessages={mergedDefaultValuesStateMessages}
        classNames={mergedClassNames}
        components={components}
      />
    )
  }

  return <>{elementsSource && <Form />}</>
}

export default Webform
