import {
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from "../types/form.d"
import { DeepRequired } from 'react-hook-form'
import Label from "../../components/form/fields/fields-sub-components/label/label"
import ErrorFieldMessage from "../../components/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage"
import FieldObjCustom from "../../components/form/fields/fields-special-components/fieldObjCustom"
import FieldWysiwygCustom from "../../components/form/fields/fields-special-components/fieldWysiwygCustom"
import Wrapper from "../../components/form/fields/fields-sub-components/wrapper"
import { TDeepRequiredClassNames } from "../types/deepRequired"

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
      errorMessage: '',
      requiredMessage: 'Field "{fieldName}" is required.',
    },
    fields: {
      errorMessages: {
        textfield: '',
        textarea: '',
        email: 'Please enter a valid email address (e.g., name@example.com).',
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

export const defaultValuesClassnames: TDeepRequiredClassNames = {
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
      itemWrapper: '',
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
  multiStep: {
    stepperContainer: '',
    stepperHeader: '',
    stepperTitle: '',
    stepperCounter: '',
    stepperProgressBarContainer: '',
    stepperProgressBar: '',
    actionsContainer: '',
    actionsButtons: '',
    actionsButtonPrev: '',
    actionsButtonsNext: '',
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
