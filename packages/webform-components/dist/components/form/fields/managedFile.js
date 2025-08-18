import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import Wrapper from "./fields-sub-components/wrapper";
import { useRef } from 'react';
import { handleFileChange } from "../../../lib/functions/webform_fields_functions/webform_fields_functions";
import ManagedFilePreview from "./fields-sub-components/managedFilePreview/managedFilePreview";
const renderManagedFile = (props) => {
    var _a, _b;
    const { key, ...restProps } = props;
    const { components, field, classNames, onBlur, control } = restProps;
    const inputRef = useRef(null);
    const CustomInputFile = components === null || components === void 0 ? void 0 : components.managedFile;
    const CustomManagedFilePreview = (_a = components === null || components === void 0 ? void 0 : components.managedFilePreview) !== null && _a !== void 0 ? _a : ManagedFilePreview;
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    const fileExtensions = (_b = field === null || field === void 0 ? void 0 : field['#file_extensions']) === null || _b === void 0 ? void 0 : _b.trim().split(' ').map((ext) => `.${ext}`).join(', ');
    const value = fieldController.value;
    const handleRemove = () => {
        fieldController.onChange({});
    };
    const isFileWithBase64 = (obj) => {
        return (obj &&
            typeof obj === 'object' &&
            'base64' in obj &&
            typeof obj.base64 === 'string');
    };
    return (_jsx(Wrapper, { field: field, classNames: classNames, components: components, classNameFieldName: "fieldInput", fieldKey: key, children: CustomInputFile ? (_jsx(CustomInputFile, { fieldController: fieldController, fieldState: fieldState, ...restProps })) : (_jsx(_Fragment, { children: isFileWithBase64(value) ? (_jsx(CustomManagedFilePreview, { value: value, handleRemove: () => handleRemove() })) : (_jsx("input", { id: key, ref: inputRef, className: cn(classNames.fields.managedFile.input, styles.field, styles.input, styles[field === null || field === void 0 ? void 0 : field['#type']], {
                    [styles.error]: fieldState.error,
                }), name: fieldController.name, minLength: field === null || field === void 0 ? void 0 : field['#minlength'], maxLength: field === null || field === void 0 ? void 0 : field['#maxlength'], placeholder: field === null || field === void 0 ? void 0 : field['#placeholder'], type: "file", accept: fileExtensions, onChange: (e) => handleFileChange(e, fieldController, inputRef), onBlur: onBlur })) })) }, key));
};
export default renderManagedFile;
//# sourceMappingURL=managedFile.js.map