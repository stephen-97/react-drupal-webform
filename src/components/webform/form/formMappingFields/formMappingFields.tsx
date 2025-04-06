import {
  renderTextField,
  validateTextField,
} from '@/components/webform/form/fields/textfield'
import { renderAction } from '@/components/webform/form/fields/action'
import {
  renderRadio,
  validateRadio,
} from '@/components/webform/form/fields/radios'
import {
  renderCheckboxes,
  validateCheckboxes,
} from '@/components/webform/form/fields/chexkboxes'
import {
  renderNumber,
  validateNumber,
} from '@/components/webform/form/fields/number'
import {
  renderSelect,
  validateSelect,
} from '@/components/webform/form/fields/select'

import { TFieldObj, TFieldValidate } from '@/lib/types/field'
import { ReactElement } from 'react'
import { renderMarkup } from '@/components/webform/form/fields/markup'
import {
  renderEmail,
  validateEmail,
} from '@/components/webform/form/fields/email'
import {
  renderCheckbox,
  validateCheckbox,
} from '@/components/webform/form/fields/checkbox'
import {
  renderTextArea,
  validateTextArea,
} from '@/components/webform/form/fields/textarea'
import { renderTel, validateTel } from '@/components/webform/form/fields/tel'

type TElementFunction = (_props: TFieldObj) => ReactElement | null
type TValidatorFunction = (_props: TFieldValidate) => void

interface TFormMappingFields {
  [key: string]: {
    element: TElementFunction | null
    validator: TValidatorFunction | null
  }
}

const FormMappingFields = (): TFormMappingFields => ({
  textfield: {
    element: renderTextField,
    validator: validateTextField,
  },
  textarea: {
    element: renderTextArea,
    validator: validateTextArea,
  },
  radios: {
    element: renderRadio,
    validator: validateRadio,
  },
  webform_actions: {
    element: renderAction,
    validator: null,
  },
  checkbox: {
    element: renderCheckbox,
    validator: validateCheckbox,
  },
  checkboxes: {
    element: renderCheckboxes,
    validator: validateCheckboxes,
  },
  number: {
    element: renderNumber,
    validator: validateNumber,
  },
  tel: {
    element: renderTel,
    validator: validateTel,
  },
  select: {
    element: renderSelect,
    validator: validateSelect,
  },
  email: {
    element: renderEmail,
    validator: validateEmail,
  },
  webform_markup: {
    element: renderMarkup,
    validator: null,
  },
  default: {
    element: null,
    validator: null,
  },
})

export default FormMappingFields
