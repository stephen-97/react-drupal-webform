import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import Label from '@/components/webform/form/fields/fields-sub-components/label/label'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import FieldObjCustom from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import FieldWysiwygCustom from '@/components/webform/form/fields/fields-special-components/fieldWysiwygCustom'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const defaultValueFormatObj: Required<TWebformValueFormat> = {
  radios: 'booleanMap',
  select: 'booleanMap',
  checkboxes: 'booleanMap',
}

export const defaultValuesObj: Required<TWebformDefaultFieldValues> = {
  textfield: '',
  textarea: '',
  email: '',
  radios: '',
  checkboxes: [],
  checkbox: false,
  number: '',
  tel: '',
  date: '',
  managed_file: {},
  select: '',
  webform_markup: '',
  webform_actions: '',
}

export const defaultValuesFieldStateMessages: DeepRequired<TWebformStateMessages> =
  {
    general: {
      errorMessage: 'Error',
      requiredMessage: 'Field "{fieldName}" is required.',
    },
    fields: {
      errorMessages: {
        textfield: '',
        textarea: '',
        email: '',
        number: 'Please enter a number.',
        tel: 'Please enter a valid phone number.',
        date: 'Invalid date format.',
        managed_file: '',
        radios: '',
      },
      requiredMessages: {
        textfield: '',
        textarea: '',
        email: '',
        radios: '',
        checkboxes: '',
        checkbox: '',
        number: '',
        tel: '',
        date: '',
        managed_file: '',
        select: '',
      },
    },
  }

export const defaultValuesClassnames: DeepRequired<TWebformClassNames> = {
  wrappers: {
    base: '',
    byCategory: {
      textInput: '',
      selectionInput: '',
      booleanInput: '',
    },
    byFieldType: {
      checkbox: '',
      checkboxes: '',
      date: '',
      email: '',
      webform_markup: '',
      textarea: '',
      textfield: '',
      radios: '',
      number: '',
      tel: '',
      select: '',
      managed_file: '',
      webform_actions: '',
    },
  },
  general: {
    fieldLabel: '',
    fieldDescription: '',
    fieldManagedFileInfo: '',
    fieldMore: '',
    fieldHelp: '',
    fieldWysiwyg: '',
  },
  states: {
    fieldError: '',
    fieldErrorMessage: '',
  },
  fields: {
    textInputs: {
      base: '',
      types: {
        text: '',
        email: '',
        number: '',
        tel: '',
        textarea: '',
        textfield: '',
      },
    },
    checkboxes: {
      groupWrapper: '',
      itemWrapper: '',
      input: '',
      label: '',
    },
    checkbox: {
      input: '',
      label: '',
    },
    radios: {
      groupWrapper: '',
      itemWrapper: '',
      input: '',
      label: '',
    },
    select: {
      select: '',
      option: '',
    },
    managedFile: {
      input: '',
    },
    markup: {
      base: '',
    },
  },
}

export const components = {
  LabelWebform: Label,
  WrapperWebform: Wrapper,
  ErrorFieldMessageWebform: ErrorFieldMessage,
  Input: FieldObjCustom,
  Select: FieldObjCustom,
  Checkboxes: FieldObjCustom,
  Wysiwyg: FieldWysiwygCustom,
}
