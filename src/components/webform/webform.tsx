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
  console.log(classNames)
  const { yupObject = {}, yupDefaultValues = {} } = yup

  const mergedValueFormat: Required<TWebformValueFormat> = {
    ...defaultValueFormatObj,
    ...valueFormat,
  }
  const mergedDefaultFieldValues: Required<TWebformDefaultFieldValues> = {
    ...defaultFieldValues,
    ...defaultValuesObj,
  }

  const mergedDefaultValuesStateMessages: DeepRequired<TWebformStateMessages> =
    deepMergeDefaults(
      defaultValuesFieldStateMessages,
      defaultFieldStateMessages as Partial<TWebformStateMessages>
    ) as DeepRequired<TWebformStateMessages>

  const mergedClassNames = mergeObjects(
    defaultValuesClassnames,
    classNames
  ) as Required<TWebformClassNames>

  const { is_multi_step, elements_sources, multi_step_extra } =
    getWebformProperties(elementsSource)

  const Form = () => {
    if (is_multi_step) {
      const { only_steps_elements, only_action_element } =
        multi_step_extra as TMultiStepProperties
      return <></>
    }

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
