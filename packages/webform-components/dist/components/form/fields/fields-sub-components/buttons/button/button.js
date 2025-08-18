import { jsx as _jsx } from "react/jsx-runtime";
import styles from './button.module.scss';
import cn from 'classnames';
const Button = ({ title, innerProps, fillType = 'fill', size = 'default', }) => {
    const { className, ...restInnerProps } = innerProps !== null && innerProps !== void 0 ? innerProps : {};
    return (_jsx("button", { className: cn(className, styles.button, styles[fillType], styles[size]), type: 'button', ...restInnerProps, children: title }));
};
export default Button;
//# sourceMappingURL=button.js.map