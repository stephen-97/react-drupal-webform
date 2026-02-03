import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from '../layout/layout.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const LayoutList = (props) => {
    const { children, className, innerProps, classNamePrefix, unstyled, field } = props;
    if (!children)
        return null;
    const layoutListClassNames = getClassNames({
        name: 'layoutList',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.layoutList),
    });
    const dataAttributes = getDataAttributes({
        component: 'layoutList',
    });
    return (_jsx("div", { className: layoutListClassNames, ...dataAttributes, ...innerProps, children: children }));
};
export default LayoutList;
