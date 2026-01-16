import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { handleFileChange } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import ManagedFilePreview from '../fields-sub-components/managedFilePreview/managedFilePreview';
const ManagedFile = ({ fieldKey, field, classNames, onBlur, className, innerProps, components, }) => {
    const { control } = useFormContext();
    const inputRef = useRef(null);
    const { field: fieldController, fieldState } = useController({
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
        return _jsx(PreviewComponent, { value: value, handleRemove: handleRemove });
    }
    return (_jsx("input", { id: fieldKey, ref: inputRef, type: "file", name: fieldController.name, accept: fileExtensions, onChange: (e) => handleFileChange(e, fieldController, inputRef), onBlur: onBlur, className: cn(classNames.fields.managedFile.input, styles.field, styles.input, styles[field?.['#type']], className, { [styles.error]: fieldState?.error }), ...innerProps }));
};
export default React.memo(ManagedFile);
