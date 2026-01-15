import {
  TWebformDefaultFieldValues,
  TWebformResolvedStateMessages,
} from '../types/form.d'
import { TDeepRequiredClassNames } from '../types/deepRequired'
import Wysiwyg from '../../components/form/fields/fields-special-components/wysiwyg/wysiwyg'
import Input from '../../components/form/fields/fields-elements/input'
import { InputProps } from '../types/components/input'
import { WysiwygProps } from '../types/components/wysiwyg'
import { TitleProps } from '../types/components/title'
import Title from '../../components/form/fields/fields-sub-components/title/title'
import { CheckboxProps } from '../types/components/checkboxe'
import Checkbox from '../../components/form/fields/fields-elements/checkbox'
import { CheckboxesProps } from '../types/components/checkboxes'
import Checkboxes from '../../components/form/fields/fields-elements/checkboxes'
import { HiddenProps } from '../types/components/hidden'
import Hidden from '../../components/form/fields/fields-elements/hidden'
import { ManagedFileProps } from '../types/components/managedFile'
import ManagedFile from '../../components/form/fields/fields-elements/managedFile'
import { RadiosProps } from '../types/components/radios'
import Radios from '../../components/form/fields/fields-elements/radios'
import Select from '../../components/form/fields/fields-elements/select'
import { SelectProps } from '../types/components/select'
import Textarea from '../../components/form/fields/fields-elements/textarea'
import { TextAreaProps } from '../types/components/textarea'
import { WrapperProps } from '../types/components/wrapper'
import Wrapper from '../../components/form/fields/fields-sub-components/wrapper'
import { ActionProps } from '../types/components/action'
import { Action } from '../../components/form/fields/action'
import { HelpProps } from '../types/components/help'
import Help from '../../components/form/fields/fields-sub-components/help/help'
import { MoreProps } from '../types/components/more'
import More from '../../components/form/fields/fields-sub-components/more/more'
import { DescriptionProps } from '../types/components/description'
import Description from '../../components/form/fields/fields-sub-components/description/description'

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
  hidden: '',
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

/**
 * export type TDrupalNonValueFieldType =
 *   | 'webform_markup'
 *   | 'webform_actions'
 *   | 'container'
 *   | 'webform_flexbox'
 *   | 'webform_section'
 *   | 'details'
 *   | 'fieldset'
 */
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
      container: '',
      fieldset: '',
      hidden: '',
      details: '',
      webform_section: '',
      webform_flexbox: '',
    },
  },
  general: {
    fieldForm: '',
    fieldTitle: '',
    fieldDescription: '',
    fieldManagedFileInfo: '',
    fieldMore: {
      container: '',
      button: '',
    },
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

export const components = {
  Input: <P extends InputProps>(props: P) => <Input {...props} />,
  Wysiwyg: <P extends WysiwygProps>(props: P) => <Wysiwyg {...props} />,
  Title: <P extends TitleProps>(props: P) => <Title {...props} />,
  Checkbox: <P extends CheckboxProps>(props: P) => <Checkbox {...props} />,
  Checkboxes: <P extends CheckboxesProps>(props: P) => (
    <Checkboxes {...props} />
  ),
  Hidden: <P extends HiddenProps>(props: P) => <Hidden {...props} />,
  ManagedFile: <P extends ManagedFileProps>(props: P) => (
    <ManagedFile {...props} />
  ),
  Radios: <P extends RadiosProps>(props: P) => <Radios {...props} />,
  Select: <P extends SelectProps>(props: P) => <Select {...props} />,
  TextArea: <P extends TextAreaProps>(props: P) => <Textarea {...props} />,
  Wrapper: <P extends WrapperProps>(props: P) => <Wrapper {...props} />,
  Action: <P extends ActionProps>(props: P) => <Action {...props} />,
  Help: <P extends HelpProps>(props: P) => <Help {...props} />,
  More: <P extends MoreProps>(props: P) => <More {...props} />,
  Description: <P extends DescriptionProps>(props: P) => (
    <Description {...props} />
  ),
}
