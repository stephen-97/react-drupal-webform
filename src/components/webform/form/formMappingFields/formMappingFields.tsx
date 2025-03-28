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
  radios: {
    element: renderRadio,
    validator: validateRadio,
  },
  webform_actions: {
    element: renderAction,
    validator: null,
  },
  checkboxes: {
    element: renderCheckboxes,
    validator: validateCheckboxes,
  },
  number: {
    element: renderNumber,
    validator: validateNumber,
  },
  select: {
    element: renderSelect,
    validator: validateSelect,
  },
  default: {
    element: null,
    validator: null,
  },
})

export default FormMappingFields
