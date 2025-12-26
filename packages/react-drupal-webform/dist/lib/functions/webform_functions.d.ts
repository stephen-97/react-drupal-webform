type TKeyValue<T = string> = Record<string, T>;
type TWebformProperties = {
    elementsSources: Record<string, any>;
    isMultiStep: boolean;
};
declare const getWebformProperties: (elements: Record<any, string>) => TWebformProperties;
export type { TKeyValue };
export { getWebformProperties };
