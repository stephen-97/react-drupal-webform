import { jsx } from '@emotion/react';
import { DrupalElementCommonProps } from '../form.d';
export interface HelpProps extends DrupalElementCommonProps {
    innerProps?: jsx.JSX.IntrinsicElements['button'];
    className?: string;
}
