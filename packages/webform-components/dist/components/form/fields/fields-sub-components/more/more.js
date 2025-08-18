'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import styles from './more.module.scss';
import Wysiwyg from "../../fields-special-components/wysiwyg/wysiwyg";
import cn from 'classnames';
const More = ({ innerPropsContainer, innerPropsButton, innerPropsWysiwyg, moreTitle, customComponentWysiwyg, }) => {
    const CustomWysiwyg = customComponentWysiwyg !== null && customComponentWysiwyg !== void 0 ? customComponentWysiwyg : Wysiwyg;
    const { className: containerClassName, ...containerProps } = innerPropsContainer !== null && innerPropsContainer !== void 0 ? innerPropsContainer : {};
    const { className: buttonClassName, ...buttonProps } = innerPropsButton !== null && innerPropsButton !== void 0 ? innerPropsButton : {};
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (_jsxs("div", { className: cn(styles.more, containerClassName), ...containerProps, children: [_jsx("button", { type: "button", className: cn(styles.button, buttonClassName, {
                    [styles.opened]: open,
                }), onClick: handleClick, ...buttonProps, children: moreTitle }), open && (innerPropsWysiwyg === null || innerPropsWysiwyg === void 0 ? void 0 : innerPropsWysiwyg.processed) && (_jsx(CustomWysiwyg, { as: 'div', ...innerPropsWysiwyg }))] }));
};
export default React.memo(More);
//# sourceMappingURL=more.js.map