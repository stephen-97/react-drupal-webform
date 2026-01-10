import { TWebformDefaultFieldValues, TWebformResolvedStateMessages } from '../types/form.d';
import { TDeepRequiredClassNames } from '../types/deepRequired';
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
    Wysiwyg: import("react").MemoExoticComponent<({ processed, as: Element, className, }: import("../types/components/wysiwyg").IWysiwygProps) => import("react/jsx-runtime").JSX.Element>;
};
