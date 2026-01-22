import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from '../layout/layout.module.scss';
const LayoutList = (props) => {
    const { children, classNames, className, innerProps } = props;
    if (!children)
        return null;
    return (_jsx("div", { className: cn(styles.layoutList, classNames.fields.layout.inner, className), ...innerProps, children: children }));
};
export default LayoutList;
