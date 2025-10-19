import { AnySchema } from 'yup'
import { JSX } from 'react'
import { ILabelWebformProps } from './components/label'
import { TDrupal_FieldType, TFieldWebformObj } from './components/field'
import { IWrapperWebformProps } from './components/wrapper'
import { IErrorMessageWebformProps } from './components/errorMessage'
import { TFieldWebformObjCustom } from './components/fieldWebformObjCustom'
import { IWysiwygProps } from './components/wysiwyg'
import { IHelpProps } from './components/help'
import { IDescriptionWebformProps } from './components/description'
import { IManagedFileInfoProps } from './components/managedFileInfo'
import { IMoreProps } from './components/more'
import { IManagedFilePreviewWebformProps } from './components/filePreview'
import { IMultiStepActionsProps } from './components/multiStepActions'
import { IMultiStepStepperProps } from './components/multiStepStepper'
import { TFieldValidate } from './components/validate'
import { ILayoutWrapperProps } from './components/layoutWrapper'
import { TFieldRendererProps } from './components/fieldRenderer'

export type TFileWithBase64 = {
  name: string
  size: number
  type: string
  lastModified: number
  lastModifiedDate: number
  base64: string
}

export type TFormatFieldMulti = 'key' | 'value' | 'keyValue' | 'booleanMap'

export type TDefaultValue = string | number | boolean | Record<string, any>

export type TWebformDefaultFieldValues = {
  [K in TDrupal_FieldType]?: TDefaultValue
}

type TWebformRequiredMessageFields = {
  [K in Exclude<
    TDrupal_FieldType,
    'webform_markup' | 'webform_actions' | 'fieldset'
  >]?: string | null
}

type TWebformErrorMessageFields = {
  [K in Exclude<
    TDrupal_FieldType,
    | 'webform_markup'
    | 'webform_actions'
    | 'radio'
    | 'checkbox'
    | 'checkboxes'
    | 'select'
    | 'fieldset'
  >]?: string | null
}

export type TWrapperCategory = 'textInput' | 'selectionInput' | 'booleanInput'

export type TWebformClassNameFields = {
  fieldInput?: string
  fieldSelect?: string
  fieldCheckboxes?: string
  fieldRadio?: string
  fieldTextarea?: string
}

export type TWebformClassNames = {
  wrappers?: {
    base?: string
    byCategory?: {
      textInput?: string
      selectionInput?: string
      booleanInput?: string
    }
    byFieldType?: Partial<Record<TDrupal_FieldType, string>>
  }
  general?: {
    fieldLabel?: string
    fieldDescription?: string
    fieldManagedFileInfo?: string
    fieldMore?: string
    fieldHelp?: string
    fieldWysiwyg?: string
  }
  states?: {
    fieldError?: string
    fieldErrorMessage?: string
  }
  fields?: {
    textInputs?: {
      base?: string
      types?: Partial<
        Record<
          'text' | 'email' | 'number' | 'tel' | 'textarea' | 'textfield',
          string
        >
      >
    }
    checkboxes?: {
      groupWrapper?: string
      itemWrapper?: string
      input?: string
      label?: string
    }
    checkbox?: {
      itemWrapper?: string
      input?: string
      label?: string
    }
    radios?: {
      groupWrapper?: string
      itemWrapper?: string
      input?: string
      label?: string
    }
    select?: {
      select?: string
      option?: string
    }
    managedFile?: {
      input?: string
    }
    markup?: {
      base?: string
    }
    layout?: {
      wrapper?: string
      title?: string
      inner?: string
    }
  }
  multiStep?: {
    stepperContainer?: string
    stepperHeader?: string
    stepperTitle?: string
    stepperCounter?: string
    stepperProgressBarContainer?: string
    stepperProgressBar?: string
    actionsContainer?: string
    actionsButtons?: string
    actionsButtonPrev?: string
    actionsButtonsNext?: string
  }
}

export type TWebformStateMessages = {
  general?: {
    errorMessage?: string
    requiredMessage?: string
  }
  fields?: {
    errorMessages?: TWebformErrorMessageFields
    requiredMessages?: TWebformRequiredMessageFields
  }
}

export type TWebformCustomComponents = {
  label?: (_props: ILabelWebformProps) => JSX.Element | null
  wrapper?: (_props: IWrapperWebformProps) => JSX.Element | null
  errorFieldMessage?: (_props: IErrorMessageWebformProps) => JSX.Element | null
  input?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  managedFile?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  managedFilePreview?: (
    _props: IManagedFilePreviewWebformProps
  ) => JSX.Element | null
  select?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  checkboxes?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  wysiwyg?: (_props: IWysiwygProps) => JSX.Element | null
  help?: (_props: IHelpProps) => JSX.Element | null
  description?: (_props: IDescriptionWebformProps) => JSX.Element | null
  managedFileInfo?: (_props: IManagedFileInfoProps) => JSX.Element | null
  more?: (_props: IMoreProps) => JSX.Element | null
  multiStepActions?: (_props: IMultiStepActionsProps) => JSX.Element | null
  multiStepStepper?: (_props: IMultiStepStepperProps) => JSX.Element | null
  layout?: (_props: ILayoutWrapperProps) => JSX.Element | null
  radios?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  textarea?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  checkbox?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  hidden?: (_props: TFieldWebformObjCustom) => JSX.Element | null
  markup?: (_props: TFieldWebformObj) => JSX.Element | null
  fieldById?: Record<
    string,
    (_props: TFieldRendererProps) => JSX.Element | null
  >
}

export type TWebformValidatorFactory = (
  ctx: TFieldValidate
) => AnySchema | null | undefined

export type TWebformCustomValidators = {
  byType?: Partial<
    Record<
      Exclude<TDrupal_FieldType, 'webform_markup' | 'webform_actions'>,
      TWebformValidatorFactory
    >
  >
  byId?: Partial<Record<string, TWebformValidatorFactory>>
}

export type TWebform = {
  elementsSource: Record<string, any>
  components?: TWebformCustomComponents
  validators?: any
  defaultFieldValues?: TWebformDefaultFieldValues
  customValidators?: TWebformCustomValidators
  classNames?: TWebformClassNames
  defaultFieldStateMessages?: TWebformStateMessages
  onSubmit: (_data: Record<string, any>) => void | Promise<any>
  includeInactiveFieldsInSubmit?: boolean
}
