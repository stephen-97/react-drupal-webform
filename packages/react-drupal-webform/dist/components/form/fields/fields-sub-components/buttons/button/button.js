import { jsx as _jsx } from "react/jsx-runtime";
import styles from './button.module.scss';
import cn from 'classnames';
import { getClassNames } from '../../../../../../lib/functions/utils_functions';
const Button = ({ title, innerProps, fillType = 'fill', size = 'default', className, classNamePrefix, unstyled, }) => {
    const { ...restInnerProps } = innerProps ?? {};
    const buttonClassNames = getClassNames({
        name: 'button',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.button, styles[fillType], styles[size], className),
    });
    return (_jsx("button", { className: buttonClassNames, type: 'button', ...restInnerProps, children: title }));
};
export default Button;
