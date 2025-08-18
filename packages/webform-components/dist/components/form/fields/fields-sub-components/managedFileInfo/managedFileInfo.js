import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './managedFileInfo.module.scss';
import cn from 'classnames';
const ManagedFileInfo = ({ field, innerProps }) => {
    return (_jsxs("div", { className: cn(styles.managedFileInfo, innerProps === null || innerProps === void 0 ? void 0 : innerProps.className), children: [_jsx("span", { className: styles.label, children: "One file limit" }), (field === null || field === void 0 ? void 0 : field['#max_filesize']) && (_jsxs("span", { className: styles.label, children: [field['#max_filesize'], " MB limit"] })), (field === null || field === void 0 ? void 0 : field['#file_extensions']) && (_jsxs("span", { className: styles.label, children: ["Allowed types: ", field['#file_extensions']] }))] }));
};
export default ManagedFileInfo;
//# sourceMappingURL=managedFileInfo.js.map