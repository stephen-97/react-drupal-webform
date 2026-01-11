import { jsx } from '@emotion/react';
import { TWebformClassNames, TWebformCustomComponents } from '../form.d';
import { TElementSource } from './field';
export interface IHelpProps {
    innerProps?: jsx.JSX.IntrinsicElements['button'];
    components: TWebformCustomComponents;
    classNames: TWebformClassNames;
    field: TElementSource;
}
