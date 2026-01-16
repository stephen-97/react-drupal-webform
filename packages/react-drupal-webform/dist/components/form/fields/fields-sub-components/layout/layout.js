import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './layout.module.scss';
const Layout = (props) => {
    const { field, classNames, children, fieldKey, className, innerProps } = props;
    return (_jsxs("div", { className: cn(styles.layoutWrapper, classNames.fields.layout.wrapper, className), ...innerProps, children: [field['#title'] && (_jsx("div", { className: cn(styles.layoutTitle, classNames.fields.layout.title), children: field['#title'] })), _jsx("div", { className: cn(styles.layoutInner, classNames.fields.layout.inner), children: children })] }, fieldKey));
};
export default React.memo(Layout);
