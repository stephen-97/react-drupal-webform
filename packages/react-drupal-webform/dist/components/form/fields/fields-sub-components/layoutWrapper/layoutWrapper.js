import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './layoutWrapper.module.scss';
const LayoutWrapper = (props) => {
    const { field, classNames, components, children, fieldKey } = props;
    const CustomLayout = components?.fieldById?.[fieldKey] ?? components?.layout;
    if (CustomLayout) {
        return _jsx(CustomLayout, { ...props, children: children });
    }
    return (_jsxs("div", { className: cn(styles.layoutWrapper, classNames.fields.layout.wrapper), children: [field['#title'] && (_jsx("div", { className: cn(styles.layoutTitle, classNames.fields.layout.title), children: field['#title'] })), _jsx("div", { className: cn(styles.layoutInner, classNames.fields.layout.inner), children: children })] }, fieldKey));
};
export default React.memo(LayoutWrapper);
