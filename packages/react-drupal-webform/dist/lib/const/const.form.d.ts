import { TWebformDefaultFieldValues, TWebformResolvedStateMessages } from '../types/form.d';
import { TDeepRequiredClassNames } from '../types/deepRequired';
import { InputProps } from '../types/components/input';
import { IWysiwygProps } from '../types/components/wysiwyg';
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
    Wysiwyg: <P extends IWysiwygProps>(props: P) => import("react/jsx-runtime").JSX.Element;
};
