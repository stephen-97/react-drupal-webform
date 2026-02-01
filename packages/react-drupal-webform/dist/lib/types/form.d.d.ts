import { AnySchema } from 'yup';
import React from 'react';
import { TitleProps } from './components/title';
import { TDrupal_FieldType, TDrupalNonValueFieldType, TDrupalValueFieldType, TElementSource, TFieldWebformObj } from './components/field';
import { FieldContainerProps } from './components/fieldContainer';
import { ErrorMessageProps } from './components/errorMessage';
import { WysiwygProps } from './components/wysiwyg';
import { HelpProps } from './components/help';
import { DescriptionProps } from './components/description';
import { ManagedFileInfoProps } from './components/managedFileInfo';
import { MoreProps } from './components/more';
import { ManagedFilePreviewProps } from './components/filePreview';
import { MultiStepActionsProps } from './components/multiStepActions';
import { MultiStepStepperProps } from './components/multiStepStepper';
import { TFieldValidate } from './components/validate';
import { LayoutProps } from './components/layout';
import { TFieldRendererProps } from './components/fieldRenderer';
import { CheckboxProps } from './components/checkboxe';
import { RadiosProps } from './components/radios';
import { SelectProps } from './components/select';
import { CheckboxesProps } from './components/checkboxes';
import { TextAreaProps } from './components/textarea';
import { HiddenProps } from './components/hidden';
import { ActionProps } from './components/action';
import { ManagedFileProps } from './components/managedFile';
import { InputProps } from './components/input';
import { FormProps } from './components/form';
import { LayoutTitleProps } from './components/layoutTitle';
import { LayoutListProps } from './components/layoutList';
import { UnsupportedFieldProps } from './components/unsupportedField';
export type TFileWithBase64 = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    lastModifiedDate: number;
    base64: string;
};
export type TDefaultValue = string | number | boolean | Record<string, any>;
export type TWebformDefaultFieldValues = {
    [K in TDrupalValueFieldType]?: TDefaultValue;
};
export type TWrapperCategory = 'textInput' | 'selectionInput' | 'booleanInput';
export type TWebformMessageResolver = (props: TElementSource) => string;
export type TWebformMessageStateValue = string | TWebformMessageResolver;
export type TWebformErrorMessageFieldType = Exclude<TDrupal_FieldType, TDrupalNonValueFieldType>;
export type TWebformRequiredMessageFieldType = Exclude<TDrupal_FieldType, TDrupalNonValueFieldType>;
export type TWebformLengthMessageFieldType = Exclude<TDrupal_FieldType, TDrupalNonValueFieldType | 'select' | 'managed_file'>;
export type TWebformResolvedStateMessages = {
    general: {
        errorMessage: string;
        requiredMessage: string;
        minLengthMessage: string;
        maxLengthMessage: string;
    };
    fields: {
        errorMessages: {
            [K in TWebformErrorMessageFieldType]: string;
        };
        requiredMessages: {
            [K in TWebformRequiredMessageFieldType]: string;
        };
        minLengthMessage: {
            [K in TWebformLengthMessageFieldType]: string;
        };
        maxLengthMessage: {
            [K in TWebformLengthMessageFieldType]: string;
        };
    };
};
export type TWebformStateMessages = {
    general?: {
        errorMessage?: TWebformMessageStateValue;
        requiredMessage?: TWebformMessageStateValue;
        minLengthMessage?: TWebformMessageStateValue;
        maxLengthMessage?: TWebformMessageStateValue;
    };
    fields?: {
        errorMessages?: Partial<Record<TWebformErrorMessageFieldType, TWebformMessageStateValue>>;
        requiredMessages?: Partial<Record<TWebformRequiredMessageFieldType, TWebformMessageStateValue>>;
        minLengthMessages?: Partial<Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>>;
        maxLengthMessages?: Partial<Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>>;
    };
};
export type TWebformNormalizedStateMessages = {
    general: {
        errorMessage: TWebformMessageStateValue;
        requiredMessage: TWebformMessageStateValue;
        minLengthMessage: TWebformMessageStateValue;
        maxLengthMessage: TWebformMessageStateValue;
    };
    fields: {
        errorMessages: Record<TWebformErrorMessageFieldType, TWebformMessageStateValue>;
        requiredMessages: Record<TWebformRequiredMessageFieldType, TWebformMessageStateValue>;
        minLengthMessages: Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>;
        maxLengthMessages: Record<TWebformLengthMessageFieldType, TWebformMessageStateValue>;
    };
};
export type TWebformCustomComponents = {
    action?: React.ComponentType<ActionProps>;
    title?: React.ComponentType<TitleProps>;
    fieldContainer?: React.ComponentType<FieldContainerProps>;
    errorFieldMessage?: React.ComponentType<ErrorMessageProps>;
    input?: React.ComponentType<InputProps>;
    managedFile?: React.ComponentType<ManagedFileProps>;
    managedFilePreview?: React.ComponentType<ManagedFilePreviewProps>;
    select?: React.ComponentType<SelectProps>;
    checkboxes?: React.ComponentType<CheckboxesProps>;
    radios?: React.ComponentType<RadiosProps>;
    textarea?: React.ComponentType<TextAreaProps>;
    checkbox?: React.ComponentType<CheckboxProps>;
    hidden?: React.ComponentType<HiddenProps>;
    wysiwyg?: React.ComponentType<WysiwygProps>;
    help?: React.ComponentType<HelpProps>;
    description?: React.ComponentType<DescriptionProps>;
    managedFileInfo?: React.ComponentType<ManagedFileInfoProps>;
    more?: React.ComponentType<MoreProps>;
    multiStepActions?: React.ComponentType<MultiStepActionsProps>;
    multiStepStepper?: React.ComponentType<MultiStepStepperProps>;
    layout?: React.ComponentType<LayoutProps>;
    layoutTitle?: React.ComponentType<LayoutTitleProps>;
    layoutList?: React.ComponentType<LayoutListProps>;
    markup?: React.ComponentType<TFieldWebformObj>;
    fieldById?: Record<string, React.ComponentType<TFieldRendererProps>>;
    form?: React.ComponentType<FormProps>;
    confirmationView?: React.ComponentType<any>;
    unsupportedField?: React.ComponentType<UnsupportedFieldProps>;
};
export type TWebformValidatorFactory = (ctx: TFieldValidate) => AnySchema | null | undefined;
export type TWebformCustomValidators = {
    byType?: Partial<Record<Exclude<TDrupal_FieldType | (string & {}), TDrupalNonValueFieldType>, TWebformValidatorFactory>>;
    byId?: Partial<Record<string, TWebformValidatorFactory>>;
};
export type TValidationMode = 'htmlNative' | 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all' | undefined;
export type TWebform = {
    elementsSource: Record<string, any>;
    components?: TWebformCustomComponents;
    validators?: any;
    validationMode?: TValidationMode;
    defaultFieldValues?: TWebformDefaultFieldValues;
    customValidators?: TWebformCustomValidators;
    classNamePrefix?: string | undefined;
    defaultFieldStateMessages?: TWebformStateMessages;
    onSubmit: (_data: Record<string, any>) => void | Promise<any>;
    includeInactiveFieldsInSubmit?: boolean;
    isSubmitted: boolean;
    showConfirmation?: boolean;
    unstyled?: boolean;
    disableActionButtonWhenInvalid?: boolean;
};
export type DrupalElementCommonProps = {
    field: TElementSource;
    classNamePrefix: string | undefined | null;
    components: TWebformCustomComponents;
    fieldKey: string;
    unstyled: boolean;
    disableActionButtonWhenInvalid?: boolean;
};
export type DrupalElementCommonNoFieldProps = {
    classNamePrefix: string | undefined | null;
    components: TWebformCustomComponents;
    unstyled: boolean;
    field?: TElementSource;
    fieldKey?: string;
};
