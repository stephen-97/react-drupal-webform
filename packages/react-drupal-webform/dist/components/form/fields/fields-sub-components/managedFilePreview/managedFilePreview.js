import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './managedFilePreview.module.scss';
import { base64ToBlob } from '../../../../../lib/functions/webform_fields_functions/webform_fields_file_functions';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
import Button from '../buttons/button/button';
const ManagedFilePreview = ({ innerProps, value, handleRemove, className, classNamePrefix, field, fieldKey, unstyled, components, classNames, }) => {
    const fileValue = value;
    const blob = base64ToBlob(fileValue.base64, fileValue.type);
    const wrapperClassNames = getClassNames({
        name: 'managedFilePreview',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.filePreview, className),
    });
    const fileInfoClassNames = getClassNames({
        name: 'managedFilePreviewInfo',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.fileInfo,
    });
    const fileNameClassNames = getClassNames({
        name: 'managedFilePreviewName',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.fileName,
    });
    const fileLinkClassNames = getClassNames({
        name: 'managedFilePreviewLink',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.link,
    });
    const fileSizeClassNames = getClassNames({
        name: 'managedFilePreviewSize',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.fileSize,
    });
    const dataAttributes = getDataAttributes({
        component: 'managedFilePreview',
    });
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, ...innerProps, children: [_jsxs("div", { className: fileInfoClassNames, children: [_jsx("span", { className: fileNameClassNames, children: _jsx("a", { className: fileLinkClassNames, href: URL.createObjectURL(blob), target: "_blank", rel: "noopener noreferrer", children: fileValue?.name }) }), _jsxs("span", { className: fileSizeClassNames, children: ["(", (fileValue?.size / 1024).toFixed(2), " KB)"] })] }), _jsx(Button, { fieldKey: fieldKey, components: components, classNames: classNames, unstyled: unstyled, field: field, classNamePrefix: classNamePrefix, fillType: "border", size: "small", title: "Remove", innerProps: { onClick: () => handleRemove() } })] }));
};
export default React.memo(ManagedFilePreview);
