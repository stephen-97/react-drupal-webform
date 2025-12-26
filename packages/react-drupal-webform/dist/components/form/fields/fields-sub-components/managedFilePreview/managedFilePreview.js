import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './managedFilePreview.module.scss';
import { base64ToBlob } from "../../../../../lib/functions/webform_fields_functions/webform_fields_file_functions";
import cn from 'classnames';
import Button from "../buttons/button/button";
const ManagedFilePreview = ({ innerProps, value, handleRemove, }) => {
    const { className, ...restInnerProps } = innerProps ?? {};
    const fileValue = value;
    const blob = base64ToBlob(fileValue.base64, fileValue.type);
    return (_jsxs("div", { className: cn(styles.filePreview, className), ...restInnerProps, children: [_jsxs("div", { className: styles.fileInfo, children: [_jsx("span", { className: styles.fileName, children: _jsx("a", { className: styles.link, href: URL.createObjectURL(blob), target: "_blank", rel: "noopener noreferrer", children: fileValue?.name }) }), _jsxs("span", { className: styles.fileSize, children: ["(", (fileValue?.size / 1024).toFixed(2), " KB)"] })] }), _jsx(Button, { fillType: 'border', size: 'small', title: 'Remove', innerProps: { onClick: () => handleRemove() } })] }));
};
export default ManagedFilePreview;
