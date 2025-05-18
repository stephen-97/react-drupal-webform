import { UseFormProps } from 'react-hook-form'
import { JSX } from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import { IErrorMessageWebformProps } from '@/lib/types/components/errorMessage'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import { IWysiwygProps } from '@/lib/types/components/wysiwyg'
import { IHelpProps } from '@/lib/types/components/help'
import { IDescriptionProps } from '@/lib/types/components/description'
import { IManagedFileInfoProps } from '@/lib/types/components/managedFileInfo'
import { IMoreProps } from '@/lib/types/components/more'
import { IManagedFilePreviewWebformProps } from '@/lib/types/components/filePreview'

export type TFileWithBase64 = {
  name: string
  size: number
  type: string
  lastModified: number
  lastModifiedDate: number
  base64: string
}

export type TYup = {
  yupUseFormProps: Omit<UseFormProps, 'resolver'>
  yupObject?: Record<string, any>
  yupDefaultValues?: Record<string, any>
}
export type TFormatFieldMulti = 'key' | 'value' | 'keyValue' | 'booleanMap'

export type TWebformValueFormat = {
  radio?: TFormatFieldMulti
  select?: TFormatFieldMulti
  checkboxes?: TFormatFieldMulti
}

export type TDefaultValue = string | number | boolean | Record<string, any>

export type TWebformStatesFieldTypes =
  | 'textfield'
  | 'textarea'
  | 'email'
  | 'radio'
  | 'checkboxes'
  | 'checkbox'
  | 'number'
  | 'tel'
  | 'date'
  | 'managedFile'
  | 'select'

export type TWebformDefaultFieldValues = {
  [K in TWebformStatesFieldTypes]?: TDefaultValue
}

export type TWebformMessageSpecificFields = {
  [K in TWebformStatesFieldTypes]?: string | null
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

  textInputs?: {
    base?: string
    types?: Partial<
      Record<
        'text' | 'email' | 'number' | 'tel' | 'textarea' | 'textfield',
        string
      >
    >
  }

  selectionInputs?: {
    base?: string
    types?: Partial<Record<'select' | 'radios', string>>
  }

  booleanInputs?: {
    base?: string
    types?: Partial<Record<'checkbox' | 'checkboxes', string>>
  }

  specific?: {
    managedFile?: string
    date?: string
    markup?: string
  }
}

export type TWebformStateMessages = {
  general?: {
    errorMessage?: string
    requiredMessage?: string
  }
  fields?: {
    errorMessages?: TWebformMessageSpecificFields
    requiredMessages?: TWebformMessageSpecificFields
  }
}

export type TWebformCustomComponents = {
  label?: (_props: ILabelWebformProps) => JSX.Element | null
  wrapper?: (_props: IWrapperWebformProps) => JSX.Element | null
  errorFieldMessage?: (_props: IErrorMessageWebformProps) => JSX.Element | null
  input?: (_props: TFieldObjCustom) => JSX.Element | null
  managedFile?: (_props: TFieldObjCustom) => JSX.Element | null
  managedFilePreview?: (
    _props: IManagedFilePreviewWebformProps
  ) => JSX.Element | null
  select?: (_props: TFieldObjCustom) => JSX.Element | null
  checkboxes?: (_props: TFieldObjCustom) => JSX.Element | null
  wysiwyg?: (_props: IWysiwygProps) => JSX.Element | null
  help?: (_props: IHelpProps) => JSX.Element | null
  description?: (_props: IDescriptionProps) => JSX.Element | null
  managedFileInfo?: (_props: IManagedFileInfoProps) => JSX.Element | null
  more?: (_props: IMoreProps) => JSX.Element | null
}

export type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
  components?: TWebformCustomComponents
  validators?: any
  valueFormat?: TWebformValueFormat
  defaultFieldValues?: TWebformDefaultFieldValues
  classNames?: TWebformClassNames
  defaultFieldStateMessages?: TWebformStateMessages
}
