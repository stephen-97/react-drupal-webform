import { TFormatFieldMulti, TWrapperCategory } from "../../types/form.d";
import { ControllerRenderProps } from 'react-hook-form';
import React from 'react';
import { TDrupal_FieldType } from "../../types/components/field";
declare const handleChangeOptions: (selectedKey: string, format: TFormatFieldMulti, fieldController: ControllerRenderProps<any, string>, options: Record<string, string>) => void;
declare const handleChangeOptionsCheckboxes: (selectedKey: string, checked: boolean, format: TFormatFieldMulti, fieldController: any, options: Record<string, string>, optionsObj: [string, string][]) => void;
declare const handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, fieldController: ControllerRenderProps<any, string>, inputRef: React.RefObject<HTMLInputElement | null>) => Promise<void>;
declare const getWrapperCategory: (type: TDrupal_FieldType) => TWrapperCategory | undefined;
export declare const getRadioChecked: ({ radioFormat, optionKey, optionValue, fieldControllerValue, }: {
    radioFormat: string;
    optionKey: string;
    optionValue: string;
    fieldControllerValue: any;
}) => boolean;
export declare const getCheckboxChecked: ({ checkboxesFormat, optionKey, optionValue, fieldControllerValue, }: {
    checkboxesFormat: string;
    optionKey: string;
    optionValue: string;
    fieldControllerValue: any;
}) => boolean;
export { handleChangeOptions, handleFileChange, handleChangeOptionsCheckboxes, getWrapperCategory, };
