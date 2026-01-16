import { AnySchema } from 'yup'
import React from 'react'
import { TitleProps } from './components/title'
import {
  TDrupal_FieldType,
  TDrupalNonValueFieldType,
  TDrupalValueFieldType,
  TElementSource,
  TFieldWebformObj,
} from './components/field'
import { FieldContainerProps } from './components/fieldContainer'
import { ErrorMessageProps } from './components/errorMessage'
import { WysiwygProps } from './components/wysiwyg'
import { HelpProps } from './components/help'
import { DescriptionProps } from './components/description'
import { IManagedFileInfoProps } from './components/managedFileInfo'
import { MoreProps } from './components/more'
import { IManagedFilePreviewWebformProps } from './components/filePreview'
import { IMultiStepActionsProps } from './components/multiStepActions'
import { IMultiStepStepperProps } from './components/multiStepStepper'
import { TFieldValidate } from './components/validate'
import { LayoutProps } from './components/layoutWrapper'
import { TFieldRendererProps } from './components/fieldRenderer'
import { IFormDefaultWebformProps } from './components/formDefault'
import { TFormMultiStepProps } from './components/formMultiStep'
import { CheckboxProps } from './components/checkboxe'
import { RadiosProps } from './components/radios'
import { SelectProps } from './components/select'
import { CheckboxesProps } from './components/checkboxes'
import { TextAreaProps } from './components/textarea'
import { HiddenProps } from './components/hidden'
import { ActionProps } from './components/action'
import { ManagedFileProps } from './components/managedFile'
import { InputProps } from './components/input'
import { FormProps } from './components/form'

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
  [K in TDrupalValueFieldType]?: TDefaultValue
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
  fieldContainer?: {
    base?: string
    byCategory?: {
      textInput?: string
      selectionInput?: string
      booleanInput?: string
    }
    byFieldType?: Partial<Record<TDrupal_FieldType, string>>
  }
  general?: {
    fieldForm?: string
    fieldTitle?: string
    fieldDescription?: string
    fieldManagedFileInfo?: string
    fieldMore?: {
      container?: string
      button?: string
    }
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

export type TWebformMessageResolver = (props: TElementSource) => string
export type TWebformMessageStateValue = string | TWebformMessageResolver

export type TWebformErrorMessageFieldType = Exclude<
  TDrupal_FieldType,
  TDrupalNonValueFieldType
>

export type TWebformRequiredMessageFieldType = Exclude<
  TDrupal_FieldType,
  TDrupalNonValueFieldType
>

export type TWebformLengthMessageFieldType = Exclude<
  TDrupal_FieldType,
  TDrupalNonValueFieldType | 'select' | 'managed_file'
>

export type TWebformResolvedStateMessages = {
  general: {
    errorMessage: string
    requiredMessage: string
    minLengthMessage: string
    maxLengthMessage: string
  }
  fields: {
    errorMessages: { [K in TWebformErrorMessageFieldType]: string }
    requiredMessages: { [K in TWebformRequiredMessageFieldType]: string }
    minLengthMessage: { [K in TWebformLengthMessageFieldType]: string }
    maxLengthMessage: { [K in TWebformLengthMessageFieldType]: string }
  }
}

export type TWebformStateMessages = {
  general?: {
    errorMessage?: TWebformMessageStateValue
    requiredMessage?: TWebformMessageStateValue
    minLengthMessage?: TWebformMessageStateValue
    maxLengthMessage?: TWebformMessageStateValue
  }
  fields?: {
    errorMessages?: Partial<
      Record<TWebformErrorMessageFieldType, TWebformMessageStateValue>
    >
    requiredMessages?: Partial<
      Record<TWebformRequiredMessageFieldType, TWebformMessageStateValue>
    >
    minLengthMessages?: Partial<
      Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>
    >
    maxLengthMessages?: Partial<
      Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>
    >
  }
}

export type TWebformNormalizedStateMessages = {
  general: {
    errorMessage: TWebformMessageStateValue
    requiredMessage: TWebformMessageStateValue
    minLengthMessage: TWebformMessageStateValue
    maxLengthMessage: TWebformMessageStateValue
  }
  fields: {
    errorMessages: Record<
      TWebformErrorMessageFieldType,
      TWebformMessageStateValue
    >
    requiredMessages: Record<
      TWebformRequiredMessageFieldType,
      TWebformMessageStateValue
    >
    minLengthMessages: Record<
      TWebformLengthMessageFieldType,
      TWebformMessageStateValue
    >

    maxLengthMessages: Record<
      TWebformLengthMessageFieldType,
      TWebformMessageStateValue
    >
  }
}

export type TWebformCustomComponents = {
  action?: React.ComponentType<ActionProps>
  title?: React.ComponentType<TitleProps>
  fieldContainer?: React.ComponentType<FieldContainerProps>
  errorFieldMessage?: React.ComponentType<ErrorMessageProps>
  input?: React.ComponentType<InputProps>
  managedFile?: React.ComponentType<ManagedFileProps>
  managedFilePreview?: React.ComponentType<IManagedFilePreviewWebformProps>
  select?: React.ComponentType<SelectProps>
  checkboxes?: React.ComponentType<CheckboxesProps>
  radios?: React.ComponentType<RadiosProps>
  textarea?: React.ComponentType<TextAreaProps>
  checkbox?: React.ComponentType<CheckboxProps>
  hidden?: React.ComponentType<HiddenProps>
  wysiwyg?: React.ComponentType<WysiwygProps>
  help?: React.ComponentType<HelpProps>
  description?: React.ComponentType<DescriptionProps>
  managedFileInfo?: React.ComponentType<IManagedFileInfoProps>
  more?: React.ComponentType<MoreProps>
  multiStepActions?: React.ComponentType<IMultiStepActionsProps>
  multiStepStepper?: React.ComponentType<IMultiStepStepperProps>
  layout?: React.ComponentType<LayoutProps>
  markup?: React.ComponentType<TFieldWebformObj>
  fieldById?: Record<string, React.ComponentType<TFieldRendererProps>>
  form?: React.ComponentType<FormProps>
  confirmationView?: React.ComponentType<any>
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
  isSubmitted: boolean
  showConfirmation?: boolean
}
