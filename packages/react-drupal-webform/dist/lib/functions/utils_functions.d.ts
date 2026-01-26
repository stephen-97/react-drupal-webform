import cn from 'classnames';
import { HTMLInputTypeAttribute } from 'react';
import { TElementSource } from '../types/components/field';
import { StringSchema } from 'yup';
declare const mergeObjects: (defaultObj: Record<string, any>, newObj: Record<string, any>) => Record<string, any>;
declare const deepMergeDefaults: <T extends object>(defaults: T, overrides: Partial<T>) => T;
export { mergeObjects, deepMergeDefaults };
export declare const getDataAttributes: ({ type, component, }: {
    type?: string;
    component?: string;
}) => {
    'data-component'?: string;
    'data-group-type'?: string;
    'data-type'?: string;
};
export declare const getClassNames: ({ name, prefix, unstyled, baseCn, modifiers, }: {
    name: string;
    prefix: string | null | undefined;
    unstyled: boolean;
    baseCn?: cn.Argument;
    modifiers?: Record<string, boolean>;
}) => string;
export declare const getAriaDescribedBy: ({ fieldKey, field, }: {
    fieldKey: string;
    field?: Record<string, any>;
}) => string | undefined;
export declare const getTextLikeInputAttributes: (field: TElementSource, type: HTMLInputTypeAttribute) => Record<string, any>;
export declare const applyPatternIfApplicable: ({ schema, field, fallbackMessage, }: {
    schema: StringSchema;
    field?: TElementSource;
    fallbackMessage?: string;
}) => StringSchema;
