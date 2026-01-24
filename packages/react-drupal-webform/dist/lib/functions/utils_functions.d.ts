import cn from 'classnames';
import { HTMLInputTypeAttribute } from 'react';
import { TElementSource } from '../types/components/field';
declare const mergeObjects: (defaultObj: Record<string, any>, newObj: Record<string, any>) => Record<string, any>;
declare const deepMergeDefaults: <T extends object>(defaults: T, overrides: Partial<T>) => T;
export { mergeObjects, deepMergeDefaults };
export declare const getDataAttributes: ({ hasError, type, component, }: {
    hasError?: boolean;
    type?: string;
    component?: string;
}) => {
    'data-component'?: string;
    'data-group-type'?: string;
    'data-type'?: string;
    'data-has-error'?: boolean;
};
export declare const getClassNames: ({ name, prefix, baseCn, }: {
    name: string;
    prefix: string | null | undefined;
    baseCn?: cn.Argument;
}) => string;
export declare const getAriaDescribedBy: ({ fieldKey, field, }: {
    fieldKey: string;
    field?: Record<string, any>;
}) => string | undefined;
export declare const getTextLikeInputAttributes: (field: TElementSource, type: HTMLInputTypeAttribute) => Record<string, any>;
