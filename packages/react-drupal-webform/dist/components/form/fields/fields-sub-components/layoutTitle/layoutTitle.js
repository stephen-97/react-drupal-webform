import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from '../layout/layout.module.scss';
const LayoutTitle = (props) => {
    const { field, classNames, className } = props;
    if (!field?.['#title'])
        return null;
    return (_jsx("div", { className: cn(styles.layoutTitle, classNames.fields.layout.title, className), children: field['#title'] }));
};
export default LayoutTitle;
