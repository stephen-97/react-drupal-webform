import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from '../layout/layout.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const LayoutTitle = (props) => {
    const { field, innerProps, className, classNamePrefix, unstyled } = props;
    if (!field?.['#title'])
        return null;
    const layoutTitleClassNames = getClassNames({
        name: 'layoutTitle',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.layoutTitle),
    });
    const dataAttributes = getDataAttributes({
        component: 'layoutTitle',
    });
    if (field?.['#type'] === 'fieldset') {
        return (_jsx("legend", { className: layoutTitleClassNames, ...innerProps, ...dataAttributes, children: field['#title'] }));
    }
    if (field['#type'] === 'details') {
        return (_jsx("summary", { className: layoutTitleClassNames, ...innerProps, ...dataAttributes, children: field['#title'] }));
    }
    return (_jsx("span", { className: layoutTitleClassNames, ...innerProps, ...dataAttributes, children: field['#title'] }));
};
export default LayoutTitle;
