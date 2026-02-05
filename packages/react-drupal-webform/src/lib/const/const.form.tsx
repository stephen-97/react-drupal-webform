import {
  TWebformDefaultFieldValues,
  TWebformResolvedStateMessages,
} from '../types/form'
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
import { FieldContainerProps } from '../types/components/fieldContainer'
import FieldContainer from '../../components/form/fields/fields-sub-components/fieldContainer'
import { ActionProps } from '../types/components/action'
import { Action } from '../../components/form/fields/action'
import { HelpProps } from '../types/components/help'
import Help from '../../components/form/fields/fields-sub-components/help/help'
import { MoreProps } from '../types/components/more'
import More from '../../components/form/fields/fields-sub-components/more/more'
import { DescriptionProps } from '../types/components/description'
import Description from '../../components/form/fields/fields-sub-components/description/description'
import { FormProps } from '../types/components/form'
import Form from '../../components/form/form'
import { MarkupProps } from '../types/components/markup'
import Markup from '../../components/form/fields/markup'
import { LayoutProps } from '../types/components/layout'
import Layout from '../../components/form/fields/fields-sub-components/layout/layout'
import LayoutTitle from '../../components/form/fields/fields-sub-components/layoutTitle/layoutTitle'
import { LayoutTitleProps } from '../types/components/layoutTitle'
import { LayoutListProps } from '../types/components/layoutList'
import LayoutList from '../../components/form/fields/fields-sub-components/layoutList/layoutList'
import MultiStepActions from '../../components/form/formMultiStep/multiStepActions/multiStepActions'
import { MultiStepActionsProps } from '../types/components/multiStepActions'

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
  term_checkboxes: [],
  term_select: '',
  entity_select: '',
  entity_checkboxes: [],
  radios_entity: '',
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
      entity_checkboxes: '',
      term_checkboxes: '',
      radios_entity: '',
      entity_select: '',
      term_select: '',
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
      entity_checkboxes: '',
      term_checkboxes: '',
      radios_entity: '',
      entity_select: '',
      term_select: '',
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
      entity_checkboxes: '',
      term_checkboxes: '',
      radios_entity: '',
      entity_select: '',
      term_select: '',
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
      entity_checkboxes: '',
      term_checkboxes: '',
      radios_entity: '',
      entity_select: '',
      term_select: '',
    },
  },
}

export const FIELD_TYPE_TO_GROUP: Record<string, string> = {
  textfield: 'input',
  email: 'input',
  number: 'input',
  tel: 'input',
  date: 'input',

  textarea: 'textarea',
  select: 'select',
  radios: 'radio',

  checkbox: 'checkbox',
  checkboxes: 'checkbox',

  managed_file: 'file',

  webform_section: 'layout',
  webform_flexbox: 'layout',
  fieldset: 'layout',
  container: 'layout',
  details: 'layout',

  webform_actions: 'action',
  webform_markup: 'markup',
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
  FieldContainer: <P extends FieldContainerProps>(props: P) => (
    <FieldContainer {...props} />
  ),
  Action: <P extends ActionProps>(props: P) => <Action {...props} />,
  Help: <P extends HelpProps>(props: P) => <Help {...props} />,
  More: <P extends MoreProps>(props: P) => <More {...props} />,
  Form: <P extends FormProps>(props: P) => <Form {...props} />,
  Markup: <P extends MarkupProps>(props: P) => <Markup {...props} />,
  Layout: <P extends LayoutProps>(props: P) => <Layout {...props} />,
  LauyoutTitle: <P extends LayoutTitleProps>(props: P) => (
    <LayoutTitle {...props} />
  ),
  LayoutList: <P extends LayoutListProps>(props: P) => (
    <LayoutList {...props} />
  ),
  Description: <P extends DescriptionProps>(props: P) => (
    <Description {...props} />
  ),
  MultiStepActions: <P extends MultiStepActionsProps>(props: P) => (
    <MultiStepActions {...props} />
  ),
}
