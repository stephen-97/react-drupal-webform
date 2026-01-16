import { TWebformDefaultFieldValues, TWebformResolvedStateMessages } from '../types/form.d';
import { TDeepRequiredClassNames } from '../types/deepRequired';
import { InputProps } from '../types/components/input';
import { WysiwygProps } from '../types/components/wysiwyg';
import { TitleProps } from '../types/components/title';
import { CheckboxProps } from '../types/components/checkboxe';
import { CheckboxesProps } from '../types/components/checkboxes';
import { HiddenProps } from '../types/components/hidden';
import { ManagedFileProps } from '../types/components/managedFile';
import { RadiosProps } from '../types/components/radios';
import { SelectProps } from '../types/components/select';
import { TextAreaProps } from '../types/components/textarea';
import { WrapperProps } from '../types/components/wrapper';
import { ActionProps } from '../types/components/action';
import { HelpProps } from '../types/components/help';
import { MoreProps } from '../types/components/more';
import { DescriptionProps } from '../types/components/description';
import { FormProps } from '../types/components/form';
import { MarkupProps } from '../types/components/markup';
import { LayoutProps } from '../types/components/layoutWrapper';
export declare const defaultValuesObj: Required<TWebformDefaultFieldValues>;
export declare const defaultValuesFieldStateMessages: TWebformResolvedStateMessages;
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
export declare const defaultValuesClassnames: TDeepRequiredClassNames;
export declare const components: {
    Input: <P extends InputProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Wysiwyg: <P extends WysiwygProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Title: <P extends TitleProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Checkbox: <P extends CheckboxProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Checkboxes: <P extends CheckboxesProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Hidden: <P extends HiddenProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    ManagedFile: <P extends ManagedFileProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Radios: <P extends RadiosProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Select: <P extends SelectProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    TextArea: <P extends TextAreaProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Wrapper: <P extends WrapperProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Action: <P extends ActionProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Help: <P extends HelpProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    More: <P extends MoreProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Form: <P extends FormProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Markup: <P extends MarkupProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Layout: <P extends LayoutProps>(props: P) => import("react/jsx-runtime").JSX.Element;
    Description: <P extends DescriptionProps>(props: P) => import("react/jsx-runtime").JSX.Element;
};
