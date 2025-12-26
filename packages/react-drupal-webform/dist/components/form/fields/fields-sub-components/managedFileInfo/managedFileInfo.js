import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './managedFileInfo.module.scss';
import cn from 'classnames';
const ManagedFileInfo = ({ field, innerProps }) => {
    return (_jsxs("div", { className: cn(styles.managedFileInfo, innerProps?.className), children: [_jsx("span", { className: styles.label, children: "One file limit" }), field?.['#max_filesize'] && (_jsxs("span", { className: styles.label, children: [field['#max_filesize'], " MB limit"] })), field?.['#file_extensions'] && (_jsxs("span", { className: styles.label, children: ["Allowed types: ", field['#file_extensions']] }))] }));
};
export default ManagedFileInfo;
