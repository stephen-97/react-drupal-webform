import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import { useRef } from 'react';
import { handleFileChange } from '../../../lib/functions/webform_fields_functions/webform_fields_functions';
import ManagedFilePreview from './fields-sub-components/managedFilePreview/managedFilePreview';
const renderManagedFile = (props) => {
    const { fieldKey, field, components, classNames, onBlur } = props;
    const { control } = useFormContext();
    const inputRef = useRef(null);
    // Custom file input (via fieldById ou custom global)
    const CustomInputFile = components?.fieldById?.[fieldKey] ?? components?.managedFile;
    const CustomManagedFilePreview = components?.managedFilePreview ?? ManagedFilePreview;
    // RHF controller (unique)
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    // Gestion des extensions
    const fileExtensions = field?.['#file_extensions']
        ?.trim()
        .split(' ')
        .map((ext) => `.${ext}`)
        .join(', ');
    const value = fieldController.value ?? {};
    const handleRemove = () => {
        fieldController.onChange({});
    };
    const isFileWithBase64 = (obj) => obj &&
        typeof obj === 'object' &&
        'base64' in obj &&
        typeof obj.base64 === 'string';
    return (_jsx(Wrapper, { field: field, classNames: classNames, components: components, classNameFieldName: "fieldInput", fieldKey: fieldKey, children: CustomInputFile ? (_jsx(CustomInputFile, { ...props })) : (_jsx(_Fragment, { children: isFileWithBase64(value) ? (_jsx(CustomManagedFilePreview, { value: value, handleRemove: handleRemove })) : (_jsx("input", { id: fieldKey, ref: inputRef, className: cn(classNames.fields.managedFile.input, styles.field, styles.input, styles[field?.['#type']], { [styles.error]: fieldState?.error }), name: fieldController.name, minLength: field?.['#minlength'], maxLength: field?.['#maxlength'], placeholder: field?.['#placeholder'], type: "file", accept: fileExtensions, onChange: (e) => handleFileChange(e, fieldController, inputRef), onBlur: onBlur })) })) }, fieldKey));
};
export default renderManagedFile;
