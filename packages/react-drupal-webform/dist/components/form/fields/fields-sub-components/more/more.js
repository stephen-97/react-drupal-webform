import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import styles from './more.module.scss';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
import cn from 'classnames';
const More = ({ innerPropsContainer, innerPropsButton, innerPropsWysiwyg, moreTitle, components, }) => {
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    const { className: containerClassName, ...containerProps } = innerPropsContainer ?? {};
    const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {};
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (_jsxs("div", { className: cn(styles.more, containerClassName), ...containerProps, children: [_jsx("button", { type: "button", className: cn(styles.button, buttonClassName, {
                    [styles.opened]: open,
                }), onClick: handleClick, ...buttonProps, children: moreTitle }), open && innerPropsWysiwyg?.processed && (_jsx(CustomWysiwyg, { as: 'div', ...innerPropsWysiwyg }))] }));
};
export default React.memo(More);
