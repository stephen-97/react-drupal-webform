import { getWebformProperties } from '@/lib/functions/webform_functions'
import { TMultiStepProperties } from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import { TWebform } from '@/lib/types/form'

const Webform = ({
  elementsSource,
  confirmationPath,
  yup,
  valueFormat,
}: TWebform) => {
  const { yupObject = {}, defaultValues = {} } = yup

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
        yup={{ ...yup, yupObject, defaultValues }}
        confirmationPath={'/'}
        elementsSource={elements_sources}
        valueFormat={valueFormat}
      />
    )
  }

  return <>{elementsSource && <Form />}</>
}

export default Webform
