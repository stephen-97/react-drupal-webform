export declare const useYupValidationResolver: (validationSchema: any) => (data: any) => Promise<{
    values: any;
    errors: {};
} | {
    values: {};
    errors: any;
}>;
