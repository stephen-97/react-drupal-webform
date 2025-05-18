import { renderAction } from '@/components/webform/form/fields/action'
import { renderRadio } from '@/components/webform/form/fields/radios'
import { renderCheckboxes } from '@/components/webform/form/fields/chexkboxes'
import { renderSelect } from '@/components/webform/form/fields/select'
import { renderMarkup } from '@/components/webform/form/fields/markup'
import { renderCheckbox } from '@/components/webform/form/fields/checkbox'
import { renderTextArea } from '@/components/webform/form/fields/textarea'
import { renderManagedFile } from '@/components/webform/form/fields/managedFile'
import { IFormMappingField } from '@/lib/types/components/formMappingField'
import { validateEmail } from '@/components/webform/form/fields/fields-validate-functions/validateEmail'
import { validateTel } from '@/components/webform/form/fields/fields-validate-functions/validateTel'
import { validateNumber } from '@/components/webform/form/fields/fields-validate-functions/validateNumber'
import { validateTextField } from '@/components/webform/form/fields/fields-validate-functions/validateTextfield'
import { validateDate } from '@/components/webform/form/fields/fields-validate-functions/validateDate'
import { validateRadio } from '@/components/webform/form/fields/fields-validate-functions/validateRadios'
import { validateCheckbox } from '@/components/webform/form/fields/fields-validate-functions/validateCheckbox'
import { validateCheckboxes } from '@/components/webform/form/fields/fields-validate-functions/validateCheckboxes'
import { validateSelect } from '@/components/webform/form/fields/fields-validate-functions/validateSelect'
import { validateManagedFile } from '@/components/webform/form/fields/fields-validate-functions/validateManagedFile'
import { renderInput } from '@/components/webform/form/fields/input'
import { validateTextArea } from '@/components/webform/form/fields/fields-validate-functions/validateTextArea'

const FormMappingFields = (): IFormMappingField => ({
  textfield: {
    element: renderInput,
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
    element: renderInput,
    validator: validateNumber,
  },
  tel: {
    element: renderInput,
    validator: validateTel,
  },
  select: {
    element: renderSelect,
    validator: validateSelect,
  },
  email: {
    element: renderInput,
    validator: validateEmail,
  },
  date: {
    element: renderInput,
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
