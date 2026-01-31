import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './layout.module.scss';
import LayoutTitle from '../layoutTitle/layoutTitle';
import LayoutList from '../layoutList/layoutList';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const Layout = (props) => {
    const { children, fieldKey, className, innerProps, classNamePrefix, components, field, unstyled, } = props;
    const LayoutTitleComponent = components?.layoutTitle ?? LayoutTitle;
    const LayoutListComponent = components?.layoutList ?? LayoutList;
    const layoutClassNames = getClassNames({
        name: 'layout',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.layoutWrapper),
    });
    const dataAttributes = getDataAttributes({
        type: field?.['#type'],
        component: 'Layout',
    });
    return (_jsxs("div", { className: layoutClassNames, ...dataAttributes, ...innerProps, children: [_jsx(LayoutTitleComponent, { ...props }), _jsx(LayoutListComponent, { ...props, children: children })] }, fieldKey));
};
export default React.memo(Layout);
