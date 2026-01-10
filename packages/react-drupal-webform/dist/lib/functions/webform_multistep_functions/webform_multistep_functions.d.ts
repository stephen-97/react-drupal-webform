import { TKeyValue } from '../webform_functions';
import { TWebformDefaultFieldValues, TWebformNormalizedStateMessages } from '../../types/form.d';
declare const isMultiStep: (elementsSource: TKeyValue<any>) => boolean;
export declare const getAllFieldNames: (elementsSource: Record<string, any>) => string[];
export declare const getDummyDefaultMultiStep: (elementsSource: Record<string, any>, defaultFieldValues: Partial<TWebformDefaultFieldValues>) => Record<string, any>;
export declare const getAllDefaultValuesFromAllSteps: ({ elementsSource, defaultFieldValues, defaultFieldStateMessages, }: {
    elementsSource: Record<string, any>;
    defaultFieldValues: Required<TWebformDefaultFieldValues>;
    defaultFieldStateMessages: TWebformNormalizedStateMessages;
}) => Record<string, any>;
export { isMultiStep };
