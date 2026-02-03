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
        classNameComponent: className,
        baseCn: cn(styles.managedFileInfo),
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
    console.log(field);
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, ...innerProps, children: [_jsx("span", { className: labelClassNames, children: "One file limit" }), _jsxs("span", { className: maxSizeClassNames, children: [field?.['#max_filesize'] ?? 100, " MB limit"] }), _jsxs("span", { className: fileExtensionClassname, children: ["Allowed types:", ' ', field?.['#file_extensions'] && field['#file_extensions'].length > 0
                        ? field['#file_extensions']
                        : 'gif, jpg, jpeg, bmp, eps, tif, pict, psd, txt, rtf, html, odf, pdf, doc, docx, ppt, pptx, xls, xlsx, xml, avi, mov, mp3, mp4, ogg, wav, bz2, dmg, gz, jar, rar, sit, svg, tar, zip.'] })] }));
};
export default React.memo(ManagedFileInfo);
