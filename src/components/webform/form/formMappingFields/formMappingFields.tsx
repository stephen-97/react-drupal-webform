import {
  renderTextField,
  validateTextField,
} from '@/components/webform/form/fields/textfield'
import { renderAction } from '@/components/webform/form/fields/action'

type TFormMappginFierlds = Record<string, { element: any; validator: any }>

const FormMappingFields = (): TFormMappginFierlds => ({
  textfield: {
    element: renderTextField,
    validator: validateTextField,
  },
  webform_actions: {
    element: renderAction,
    validator: null,
  },
  default: {
    element: null,
    validator: null,
  },
})

export default FormMappingFields
