import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './confirmationView.module.scss';
const ConfirmationView = () => {
    return (_jsxs("div", { className: cn(styles.submittedMessage), role: "status", "aria-live": "polite", children: [_jsxs("div", { className: styles.header, children: [_jsx("span", { className: styles.icon, "aria-hidden": "true" }), _jsx("span", { className: styles.title, children: "Submission received" })] }), _jsx("p", { className: styles.text, children: "Thanks! Your form has been successfully submitted." })] }));
};
export default React.memo(ConfirmationView);
