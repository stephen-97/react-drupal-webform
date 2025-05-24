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

  const { is_multi_step, elements_sources, multi_step_extra } =
    getWebformProperties(elementsSource)

  const Form = () => {
    if (is_multi_step) {
      const { only_steps_elements, only_action_element } =
        multi_step_extra as TMultiStepProperties
      return <></>
    }

    console.log('test')

    return (
      <FormDefault
        yup={{ ...yup, yupObject, yupDefaultValues }}
        confirmationPath={'/'}
        elementsSource={elements_sources}
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
