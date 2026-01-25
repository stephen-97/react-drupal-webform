import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './errorFieldMessage.module.scss';
import cn from 'classnames';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
import { useController, useFormContext } from 'react-hook-form';
const ErrorFieldMessage = ({ children, className, fieldKey, classNamePrefix, unstyled, }) => {
    const wrapperClassNames = getClassNames({
        name: 'errorFieldMessage',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.errorFieldMessage, className),
    });
    const messageClassNames = getClassNames({
        name: 'errorFieldMessageText',
        prefix: classNamePrefix,
        unstyled: unstyled,
    });
    const dataAttributes = getDataAttributes({
        component: 'errorFieldMessage',
    });
    const { control } = useFormContext();
    const { fieldState } = useController({
        name: fieldKey,
        control,
    });
    const rawMessage = fieldState?.error?.message;
    const message = typeof rawMessage === 'string' &&
        rawMessage.trim() !== '' &&
        rawMessage !== '0'
        ? rawMessage
        : null;
    if (!message) {
        return null;
    }
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, children: [message && _jsx("span", { className: messageClassNames, children: message }), children] }));
};
export default ErrorFieldMessage;
