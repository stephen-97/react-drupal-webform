import { ReactNode } from 'react';
import { IWysiwygProps } from "../../../../lib/types/components/wysiwyg";
type TFieldWysiwygCustom = IWysiwygProps & {
    children: ReactNode;
};
declare const FieldWysiwygCustom: (props: TFieldWysiwygCustom) => import("react/jsx-runtime").JSX.Element;
export type { TFieldWysiwygCustom };
export default FieldWysiwygCustom;
