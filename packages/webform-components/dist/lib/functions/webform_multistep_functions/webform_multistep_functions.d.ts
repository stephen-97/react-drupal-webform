import { TKeyValue } from '../webform_functions';
import { TWebformDefaultFieldValues, TWebformStateMessages } from '../../types/form.d';
import { DeepRequired } from 'react-hook-form';
declare const isMultiStep: (elementsSource: TKeyValue<any>) => boolean;
export declare const getAllFieldNames: (elementsSource: Record<string, any>) => string[];
export declare const getDummyDefaultMultiStep: (elementsSource: Record<string, any>) => Record<string, any>;
export declare const getAllDefaultValuesFromAllSteps: ({ elementsSource, defaultFieldValues, defaultFieldStateMessages, }: {
    elementsSource: Record<string, any>;
    defaultFieldValues: Required<TWebformDefaultFieldValues>;
    defaultFieldStateMessages: DeepRequired<TWebformStateMessages>;
}) => Record<string, any>;
export { isMultiStep };
