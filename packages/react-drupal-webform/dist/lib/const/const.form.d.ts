import { TWebformDefaultFieldValues, TWebformStateMessages } from '../types/form.d';
import { DeepRequired } from 'react-hook-form';
import { TDeepRequiredClassNames } from '../types/deepRequired';
export declare const defaultValuesObj: Required<TWebformDefaultFieldValues>;
export declare const defaultValuesFieldStateMessages: DeepRequired<TWebformStateMessages>;
export declare const defaultValuesClassnames: TDeepRequiredClassNames;
export declare const components: {
    LabelWebform: ({ title, innerProps, isRequired, innerPropsHelpComponent, custom_component_help, wrapperElement, }: import("../types/components/label").ILabelWebformProps) => import("react/jsx-runtime").JSX.Element;
    WrapperWebform: import("react").MemoExoticComponent<(props: import("../types/components/wrapper").IWrapperWebformProps) => import("react/jsx-runtime").JSX.Element>;
    ErrorFieldMessageWebform: ({ message, children, className, }: import("../types/components/errorMessage").IErrorMessageWebformProps) => import("react/jsx-runtime").JSX.Element;
    Input: (props: import("../types/components/fieldWebformObjCustom").TFieldWebformObjCustom) => import("react/jsx-runtime").JSX.Element;
    Select: (props: import("../types/components/fieldWebformObjCustom").TFieldWebformObjCustom) => import("react/jsx-runtime").JSX.Element;
    Checkboxes: (props: import("../types/components/fieldWebformObjCustom").TFieldWebformObjCustom) => import("react/jsx-runtime").JSX.Element;
    Wysiwyg: (props: import("../../components/form/fields/fields-special-components/fieldWysiwygCustom").TFieldWysiwygCustom) => import("react/jsx-runtime").JSX.Element;
};
