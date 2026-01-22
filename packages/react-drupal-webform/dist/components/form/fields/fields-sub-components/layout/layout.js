import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './layout.module.scss';
import LayoutTitle from '../layoutTitle/layoutTitle';
import LayoutList from '../layoutList/layoutList';
const Layout = (props) => {
    const { classNames, children, fieldKey, className, innerProps, components } = props;
    const LayoutTitleComponent = components?.layoutTitle ?? LayoutTitle;
    const LayoutListComponent = components?.layoutList ?? LayoutList;
    return (_jsxs("div", { className: cn(styles.layoutWrapper, classNames.fields.layout.wrapper, className), ...innerProps, children: [_jsx(LayoutTitleComponent, { ...props }), _jsx(LayoutListComponent, { ...props, children: children })] }, fieldKey));
};
export default React.memo(Layout);
