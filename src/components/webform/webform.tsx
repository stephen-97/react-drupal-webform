import { getWebformProperties } from '@/lib/functions/webform_functions'
import { TMultiStepProperties } from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import { UseFormReturn } from 'react-hook-form'

export type TYup = {
  yupReturn: UseFormReturn<any>
  yupObject: any
  defaultValues: any
}

export type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
}

const Webform = ({ elementsSource, confirmationPath, yup }: TWebform) => {
  const { is_multi_step, elements_sources, multi_step_extra } =
    getWebformProperties(elementsSource)

  console.log(yup)
  const Form = () => {
    if (is_multi_step) {
      const { only_steps_elements, only_action_element } =
        multi_step_extra as TMultiStepProperties
      return <></>
    }

    return (
      <FormDefault
        yup={yup}
        confirmationPath={'/'}
        elements={elements_sources}
      />
    )
  }

  return <>{elementsSource && <Form />}</>
}

export default Webform
