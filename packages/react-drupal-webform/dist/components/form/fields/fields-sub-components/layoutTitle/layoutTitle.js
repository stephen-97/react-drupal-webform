import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from '../layout/layout.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const LayoutTitle = (props) => {
    const { field, innerProps, className, classNamePrefix } = props;
    if (!field?.['#title'])
        return null;
    const layoutListClassNames = getClassNames({
        name: 'layoutTitle',
        prefix: classNamePrefix,
        baseCn: cn(styles.layoutTitle, className),
    });
    const dataAttributes = getDataAttributes({
        component: 'layoutTitle',
    });
    return (_jsx("div", { className: layoutListClassNames, ...innerProps, ...dataAttributes, children: field['#title'] }));
};
export default LayoutTitle;
