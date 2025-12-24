import { TWebformCustomValidators, TWebformDefaultFieldValues, TWebformStateMessages } from '../../types/form.d';
import { DeepRequired } from 'react-hook-form';
import * as yup from 'yup';
export declare const checkVisibilityCondition: (watched: any, expectedValue: any, mode?: "is" | "isNot") => boolean;
export declare function shouldFieldBeVisible(fieldKey: string, elementsSource: Record<string, any>, watchedValues: Record<string, string>): boolean;
export type TDependentField = {
    name: string;
    type: string;
};
export declare function isLayoutType(type: unknown): type is string;
export declare function extractVisibleFields(source: Record<string, any>, visibleKeys: string[], watchedValues: Record<string, any>): Array<{
    key: string;
    field: any;
}>;
export declare function getDependentFields(elementsSource: Record<string, any>): TDependentField[];
export declare const generateFormSchemaAndDefaults: ({ elementsSource, visibleElementsKeys, defaultFieldValues, defaultFieldStateMessages, customValidators, watchedValues, }: {
    elementsSource: Record<string, any>;
    visibleElementsKeys: string[];
    defaultFieldValues: Required<TWebformDefaultFieldValues>;
    defaultFieldStateMessages: DeepRequired<TWebformStateMessages>;
    customValidators?: TWebformCustomValidators;
    watchedValues?: Record<string, any>;
}) => {
    defaultValues: Record<string, any>;
    validationSchema: yup.ObjectSchema<{
        [x: string]: any;
    }, yup.AnyObject, {
        [x: string]: any;
    }, "">;
};
