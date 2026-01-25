import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './managedFileInfo.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const ManagedFileInfo = ({ field, innerProps, className, classNamePrefix, unstyled, }) => {
    const wrapperClassNames = getClassNames({
        name: 'managedFileInfo',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.managedFileInfo, className),
    });
    const labelClassNames = getClassNames({
        name: 'managedFileLabel',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.label),
    });
    const maxSizeClassNames = getClassNames({
        name: 'managedFileInfoMaxSize',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.label),
    });
    const fileExtensionClassname = getClassNames({
        name: 'managedFileFileExtension',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.label),
    });
    const dataAttributes = getDataAttributes({
        component: 'managedFileInfo',
        type: 'managed_file',
    });
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, ...innerProps, children: [_jsx("span", { className: labelClassNames, children: "One file limit" }), field?.['#max_filesize'] && (_jsxs("span", { className: maxSizeClassNames, children: [field['#max_filesize'], " MB limit"] })), field?.['#file_extensions'] && (_jsxs("span", { className: fileExtensionClassname, children: ["Allowed types: ", field['#file_extensions']] }))] }));
};
export default React.memo(ManagedFileInfo);
