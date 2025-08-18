import { TFormatFieldMulti, TWebformCustomValidators, TWebformDefaultFieldValues, TWebformStateMessages, TWebformValueFormat } from "../../types/form.d";
import { DeepRequired } from 'react-hook-form';
import * as yup from 'yup';
export declare const checkVisibilityCondition: (format: TFormatFieldMulti, depConfig: any, watched: any, expectedKeyOrValue: any) => boolean;
export declare function shouldFieldBeVisible(fieldKey: string, elementsSource: Record<string, any>, watchedValues: Record<string, string>, valueFormat: Record<string, TFormatFieldMulti>): boolean;
export declare function shouldMultiStepFieldBeVisible(fieldKey: string, elementsSource: Record<string, any>, watchedStepValues: Record<string, any>, prevStepValues: Record<string, any>, currentFieldKeys: string[], valueFormat: Record<string, any>): boolean;
export type TDependentField = {
    name: string;
    type: string;
};
export declare function getDependentFields(elementsSource: Record<string, any>): TDependentField[];
export declare const generateFormSchemaAndDefaults: ({ elementsSource, visibleElementsKeys, valueFormat, defaultFieldValues, defaultFieldStateMessages, customValidators, }: {
    elementsSource: Record<string, any>;
    visibleElementsKeys: string[];
    valueFormat: Required<TWebformValueFormat>;
    defaultFieldValues: Required<TWebformDefaultFieldValues>;
    defaultFieldStateMessages: DeepRequired<TWebformStateMessages>;
    customValidators?: TWebformCustomValidators;
}) => {
    defaultValues: Record<string, any>;
    validationSchema: yup.ObjectSchema<{
        [x: string]: any;
    }, yup.AnyObject, {
        [x: string]: any;
    }, "">;
};
