import { TFieldValidate } from '../../types/components/validate';
import { TDrupal_FieldType } from '../../types/components/field';
import { TWebformErrorMessageFieldType, TWebformLengthMessageFieldType } from '../../types/form.d';
export declare const useYupValidationResolver: (validationSchema: any) => (data: any) => Promise<{
    values: any;
    errors: {};
} | {
    values: {};
    errors: any;
}>;
export type TResolvedFieldMessages = {
    required: string;
    error: string;
    minLength: string;
    maxLength: string;
};
export declare const isErrorMessageFieldType: (type: TDrupal_FieldType) => type is TWebformErrorMessageFieldType;
export declare const isLengthMessageFieldType: (type: unknown) => type is TWebformLengthMessageFieldType;
export declare const resolveFieldMessages: (props: TFieldValidate) => TResolvedFieldMessages;
