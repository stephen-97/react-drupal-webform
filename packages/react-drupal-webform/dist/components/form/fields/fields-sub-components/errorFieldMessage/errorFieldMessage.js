import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './errorFieldMessage.module.scss';
import cn from 'classnames';
const ErrorFieldMessage = ({ message, children, className, classNames, }) => {
    return (_jsxs("div", { className: cn(styles.errorFieldMessage, classNames.states?.fieldError, className), children: [message && (_jsx("span", { className: cn(classNames.states?.fieldErrorMessage), children: message })), children] }));
};
export default ErrorFieldMessage;
