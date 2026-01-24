import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { handleFileChange } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import ManagedFilePreview from '../fields-sub-components/managedFilePreview/managedFilePreview';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const ManagedFile = ({ fieldKey, field, className, innerProps, components, ariaDescribedBy, classNamePrefix, }) => {
    const { control } = useFormContext();
    const inputRef = useRef(null);
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const PreviewComponent = components?.managedFilePreview ?? ManagedFilePreview;
    const fileExtensions = field?.['#file_extensions']
        ?.trim()
        .split(' ')
        .map((ext) => `.${ext}`)
        .join(', ');
    const value = fieldController.value ?? {};
    const isFileWithBase64 = (obj) => obj &&
        typeof obj === 'object' &&
        'base64' in obj &&
        typeof obj.base64 === 'string';
    const handleRemove = () => {
        fieldController.onChange({});
    };
    if (isFileWithBase64(value)) {
        return (_jsx(PreviewComponent, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, value: value, handleRemove: handleRemove }));
    }
    const inputClassNames = getClassNames({
        name: 'managedFile',
        prefix: classNamePrefix,
        baseCn: cn(styles.field, styles.input, className),
    });
    const dataAttributes = getDataAttributes({
        component: 'managedFile',
    });
    return (_jsx("input", { id: fieldKey, ref: inputRef, type: "file", name: fieldController.name, accept: fileExtensions, onChange: (e) => handleFileChange(e, fieldController, inputRef), className: inputClassNames, "aria-describedby": ariaDescribedBy, ...dataAttributes, ...innerProps }));
};
export default React.memo(ManagedFile);
