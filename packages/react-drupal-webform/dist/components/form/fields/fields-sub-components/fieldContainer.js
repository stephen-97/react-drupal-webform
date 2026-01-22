import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './fieldContainer.module.scss';
import { getWrapperCategory } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import WrapperField from './wrapper-sub-components/wrapperField';
import WrapperDescription from './wrapper-sub-components/wrapperDescription';
import WrapperMore from './wrapper-sub-components/wrapperMore';
import WrapperManagedFileInfo from './wrapper-sub-components/wrapperManagedFileInfo';
import Title from './title/title';
import { useController, useFormContext } from 'react-hook-form';
const FieldContainer = (props) => {
    const { children, field, classNames, isLabel = true, components, fieldKey, wrapperElement = 'div', innerProps, className, } = props;
    const TitleComponent = components?.title ?? Title;
    const wrapperCategory = getWrapperCategory(field['#type']);
    const WrapperElement = wrapperElement ?? 'div';
    const labelWrapperElement = field?.['#type'] === 'checkboxes' || field?.['#type'] === 'radios'
        ? 'legend'
        : 'label';
    const { control } = useFormContext();
    const { fieldState } = useController({
        name: fieldKey,
        control,
    });
    const stateError = fieldState?.error;
    return (_jsxs(WrapperElement, { className: cn(...(field?.['#attributes']?.class ?? []), classNames.fieldContainer?.byFieldType?.[field['#type']], wrapperCategory
            ? classNames.fieldContainer?.byCategory?.[wrapperCategory]
            : undefined, classNames.fieldContainer?.base, {
            [classNames.states.fieldError ?? '']: Boolean(stateError),
            [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
        }, styles.fieldWrapper, className), ...innerProps, children: [isLabel && field?.['#title'] && (_jsx(TitleComponent, { wrapperElement: labelWrapperElement, components: components, classNames: classNames, field: field, fieldKey: fieldKey })), _jsx(WrapperField, { field: field, classNames: classNames, components: components, stateError: stateError, fieldKey: fieldKey, children: children }), (field?.['#description'] || field?.['#file_placeholder']) && (_jsx(WrapperDescription, { field: field, classNames: classNames, components: components })), field['#type'] === 'managed_file' && (_jsx(WrapperManagedFileInfo, { field: field, components: components })), field?.['#more'] && field?.['#more_title'] && (_jsx(WrapperMore, { fieldMore: field['#more'], fieldMoreTitle: field['#more_title'], classNames: classNames, components: components }))] }));
};
export default React.memo(FieldContainer);
