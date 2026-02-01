import { ControllerRenderProps } from 'react-hook-form';
import React from 'react';
declare const handleChangeOptions: (selectedKey: string, fieldController: ControllerRenderProps<any, string>) => void;
declare const handleChangeOptionsCheckboxes: (selectedKey: string, checked: boolean, fieldController: any) => void;
declare const handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, fieldController: ControllerRenderProps<any, string>, inputRef: React.RefObject<HTMLInputElement | null>) => Promise<void>;
export { handleChangeOptions, handleFileChange, handleChangeOptionsCheckboxes };
