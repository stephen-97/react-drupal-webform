import { ReactNode } from 'react';
import { TFieldWebformObj } from "../../../../lib/types/components/field";
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
type TFieldWebformObjCustom = Omit<TFieldWebformObj, 'key'> & {
    fieldController: ControllerRenderProps<any, string>;
    fieldState: ControllerFieldState;
    children?: ReactNode;
    key?: string;
};
declare const FieldObjCustom: (props: TFieldWebformObjCustom) => import("react/jsx-runtime").JSX.Element;
export type { TFieldWebformObjCustom };
export default FieldObjCustom;
