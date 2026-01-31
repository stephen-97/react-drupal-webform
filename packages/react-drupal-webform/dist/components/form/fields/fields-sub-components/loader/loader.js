import { jsx as _jsx } from "react/jsx-runtime";
import styles from './loader.module.scss';
import cn from 'classnames';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const Loader = (props) => {
    const { innerProps, className, classNamePrefix, unstyled } = props;
    const loaderClassNames = getClassNames({
        name: 'loader',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.loader),
    });
    const dataAttributes = getDataAttributes({
        component: 'loader',
    });
    return (_jsx("span", { className: loaderClassNames, ...dataAttributes, ...innerProps }));
};
export default Loader;
