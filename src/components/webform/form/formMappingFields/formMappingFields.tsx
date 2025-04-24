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
import { renderDate, validateDate } from '@/components/webform/form/fields/date'
import {
  renderManagedFile,
  validateManagedFile,
} from '@/components/webform/form/fields/managedFile'
import { IFormMappingField } from '@/lib/types/components/formMappingField'

const FormMappingFields = (): IFormMappingField => ({
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
  date: {
    element: renderDate,
    validator: validateDate,
  },
  webform_markup: {
    element: renderMarkup,
    validator: null,
  },
  managed_file: {
    element: renderManagedFile,
    validator: validateManagedFile,
  },
  default: {
    element: null,
    validator: null,
  },
})

export default FormMappingFields
