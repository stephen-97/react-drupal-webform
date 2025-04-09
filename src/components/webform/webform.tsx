import { getWebformProperties } from '@/lib/functions/webform_functions'
import { TMultiStepProperties } from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import {
  TWebform,
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import {
  defaultValueFormatObj,
  defaultValuesClassnames,
  defaultValuesObj,
} from '@/lib/const/const.form'
import { mergeObjects } from '@/lib/functions/utils_functions'

const Webform = ({
  elementsSource,
  confirmationPath,
  yup,
  valueFormat = {},
  defaultFieldValues = {},
  classNames = {},
}: TWebform) => {
  const { yupObject = {}, yupDefaultValues = {} } = yup

  const mergedValueFormat: Required<TWebformValueFormat> = {
    ...defaultValueFormatObj,
    ...valueFormat,
  }
  const mergedDefaultFieldValues: Required<TWebformDefaultFieldValues> = {
    ...defaultFieldValues,
    ...defaultValuesObj,
  }

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
        classNames={mergedClassNames}
      />
    )
  }

  return <>{elementsSource && <Form />}</>
}

export default Webform
