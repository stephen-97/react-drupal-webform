import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './errorFieldMessage.module.scss';
import cn from 'classnames';
const ErrorFieldMessage = ({ message, children, className, }) => {
    return (_jsxs("div", { className: cn(styles.errorFieldMessage, className), children: [message && _jsx("span", { children: message }), children] }));
};
export default ErrorFieldMessage;
