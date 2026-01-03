import { ComponentType } from 'react';
import { TFieldWebformObj } from './components/field';
import { IWysiwygProps } from './components/wysiwyg';
import { IErrorMessageWebformProps } from './components/errorMessage';
export type TWebformComponents = {
    Action: ComponentType<TFieldWebformObj>;
    Checkbox: ComponentType<TFieldWebformObj>;
    Checkboxes: ComponentType<TFieldWebformObj>;
    Hidden: ComponentType<TFieldWebformObj>;
    Input: ComponentType<TFieldWebformObj>;
    Layout: ComponentType<TFieldWebformObj>;
    ManagedFile: ComponentType<TFieldWebformObj>;
    Markup: ComponentType<TFieldWebformObj>;
    Radios: ComponentType<TFieldWebformObj>;
    Select: ComponentType<TFieldWebformObj>;
    Textarea: ComponentType<TFieldWebformObj>;
    Wysiwyg: ComponentType<IWysiwygProps>;
    ErrorFieldMessage: ComponentType<IErrorMessageWebformProps>;
};
