import {
  TWebformDefaultFieldValues,
  TWebformResolvedStateMessages,
} from '../types/form.d'
import Label from '../../components/form/fields/fields-sub-components/label/label'
import ErrorFieldMessage from '../../components/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import Wrapper from '../../components/form/fields/fields-sub-components/wrapper'
import { TDeepRequiredClassNames } from '../types/deepRequired'
import renderInput from '../../components/form/fields/input'
import renderLayout from '../../components/form/fields/layout'
import renderManagedFile from '../../components/form/fields/managedFile'
import { renderRadio } from '../../components/form/fields/radios'
import { renderSelect } from '../../components/form/fields/select'
import { renderCheckboxes } from '../../components/form/fields/chexkboxes'
import { renderCheckbox } from '../../components/form/fields/checkbox'
import { renderTextArea } from '../../components/form/fields/textarea'
import { TWebformComponents } from '../types/component-list'
import { renderMarkup } from '../../components/form/fields/markup'
import { renderHidden } from '../../components/form/fields/hidden'
import Wysiwyg from '../../components/form/fields/fields-special-components/wysiwyg/wysiwyg'
import { renderAction } from '../../components/form/fields/action'

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
  hidden: '',
  fieldset: '',
}

export const defaultValuesFieldStateMessages: TWebformResolvedStateMessages = {
  general: {
    errorMessage: '',
    requiredMessage: 'Field "{fieldName}" is required.',
    minLengthMessage:
      'Field "{fieldName}" must contain at least {minLength} characters.',
    maxLengthMessage:
      'Field "{fieldName}" must contain no more than {maxLength} characters.',
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
      hidden: '',
      checkbox: '',
      checkboxes: '',
      select: '',
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
      hidden: '',
    },
    minLengthMessage: {
      textfield: '',
      textarea: '',
      email: '',
      radios: '',
      checkboxes: '',
      checkbox: '',
      number: '',
      tel: '',
      date: '',
      hidden: '',
    },
    maxLengthMessage: {
      textfield: '',
      textarea: '',
      email: '',
      radios: '',
      checkboxes: '',
      checkbox: '',
      number: '',
      tel: '',
      date: '',
      hidden: '',
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
      fieldset: '',
      hidden: '',
    },
  },
  general: {
    fieldForm: '',
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
    layout: {
      wrapper: '',
      title: '',
      inner: '',
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

export const components: TWebformComponents = {
  ErrorFieldMessage: ErrorFieldMessage,
  Input: renderInput,
  Layout: renderLayout,
  ManagedFile: renderManagedFile,
  Radios: renderRadio,
  Select: renderSelect,
  Checkboxes: renderCheckboxes,
  Checkbox: renderCheckbox,
  Textarea: renderTextArea,
  Markup: renderMarkup,
  Hidden: renderHidden,
  Wysiwyg: Wysiwyg,
  Action: renderAction,
}
