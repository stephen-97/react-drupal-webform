import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import Label from '@/components/webform/form/fields/fields-sub-components/label/label'
import { DefaultWrapper } from '@/components/webform/form/fields/fields-sub-components/wrapper'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import FieldObjCustom from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import FieldWysiwygCustom from '@/components/webform/form/fields/fields-special-components/fieldWysiwygCustom'

export const defaultValueFormatObj: Required<TWebformValueFormat> = {
  radio: 'booleanMap',
  select: 'booleanMap',
  checkboxes: 'booleanMap',
}

export const defaultValuesObj: Required<TWebformDefaultFieldValues> = {
  textfield: '',
  textarea: '',
  email: '',
  radio: '',
  checkboxes: [],
  checkbox: false,
  number: '',
  tel: '',
  date: '',
  managedFile: {},
  select: '',
}

export const defaultValuesFieldStateMessages: DeepRequired<TWebformStateMessages> =
  {
    general: {
      errorMessage: 'Field Error Mince',
      requiredMessage: 'Field is Required',
    },
    fields: {
      errorMessages: {
        textfield: '',
        textarea: '',
        email: '',
        radio: '',
        checkboxes: '',
        checkbox: '',
        number: '',
        tel: '',
        date: '',
        managedFile: '',
        select: '',
      },
      requiredMessages: {
        textfield: '',
        textarea: '',
        email: '',
        radio: '',
        checkboxes: '',
        checkbox: '',
        number: '',
        tel: '',
        date: '',
        managedFile: '',
        select: '',
      },
    },
  }

export const defaultValuesClassnames: DeepRequired<TWebformClassNames> = {
  general: {
    fieldWrapper: '',
    fieldLabel: '',
    fieldDescription: '',
    fieldHelp: '',
    fieldManagedFileInfo: '',
    fieldMore: '',
    fieldWysiwyg: '',
  },
  states: {
    fieldError: '',
    fieldErrorMessage: '',
  },
  fields: {
    fieldInput: '',
    fieldSelect: '',
    fieldCheckboxes: '',
    fieldRadio: '',
    fieldTextarea: '',
  },
  types: {
    checkbox: '',
    checkboxes: '',
    tel: '',
    textfield: '',
    textarea: '',
    date: '',
    email: '',
    webform_markup: '',
    select: '',
    number: '',
    managed_file: '',
  },
}

export const components = {
  LabelWebform: Label,
  WrapperWebform: DefaultWrapper,
  ErrorFieldMessageWebform: ErrorFieldMessage,
  Input: FieldObjCustom,
  Select: FieldObjCustom,
  Checkboxes: FieldObjCustom,
  Wysiwyg: FieldWysiwygCustom,
}
