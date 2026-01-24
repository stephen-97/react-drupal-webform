import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import cn from 'classnames';
import styles from './more.module.scss';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
import { getClassNames } from '../../../../../lib/functions/utils_functions';
import { getDataAttributes } from '../../../../../lib/functions/utils_functions';
const More = ({ innerPropsContainer, innerPropsButton, innerPropsWysiwyg, components, className, classNamePrefix, field, }) => {
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    const { className: containerClassName, ...containerProps } = innerPropsContainer ?? {};
    const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {};
    const [open, setOpen] = useState(false);
    const containerClassNames = getClassNames({
        name: 'more',
        prefix: classNamePrefix,
        baseCn: cn(styles.more, containerClassName, className),
    });
    const buttonClassNames = getClassNames({
        name: 'moreButton',
        prefix: classNamePrefix,
        baseCn: cn(styles.button, buttonClassName, {
            [styles.opened]: open,
        }),
    });
    const wysiwygClassNames = getClassNames({
        name: 'moreContent',
        prefix: classNamePrefix,
        baseCn: cn(styles.moreWysiwyg),
    });
    const dataAttributes = getDataAttributes({
        component: 'more',
    });
    const moreTitle = field?.['#more_title'];
    const moreText = field?.['#more'];
    return (_jsxs("div", { className: containerClassNames, ...dataAttributes, ...containerProps, children: [_jsx("button", { type: "button", className: buttonClassNames, onClick: () => setOpen((prev) => !prev), ...buttonProps, children: moreTitle ?? 'More' }), open && moreText && moreText.length > 0 && (_jsx(CustomWysiwyg, { as: "div", className: wysiwygClassNames, processed: moreText, source: 'more', ...innerPropsWysiwyg }))] }));
};
export default React.memo(More);
