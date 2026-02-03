import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './fieldContainer.module.scss';
import WrapperField from './wrapper-sub-components/wrapperField';
import WrapperDescription from './wrapper-sub-components/wrapperDescription';
import WrapperMore from './wrapper-sub-components/wrapperMore';
import WrapperManagedFileInfo from './wrapper-sub-components/wrapperManagedFileInfo';
import Title from './title/title';
import { useController, useFormContext } from 'react-hook-form';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const FieldContainer = (props) => {
    const { children, field, isLabel = true, components, fieldKey, wrapperElement = 'div', innerProps, className, classNamePrefix, unstyled, } = props;
    const TitleComponent = components?.title ?? Title;
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
    const dataAttributes = getDataAttributes({
        type: field['#type'],
        component: 'fieldContainer',
    });
    const isRequired = Boolean(field?.['#required']);
    const hasError = Boolean(stateError);
    const componentClassNames = getClassNames({
        name: 'fieldContainer',
        prefix: classNamePrefix,
        unstyled: unstyled,
        modifiers: {
            required: isRequired,
            'has-error': hasError,
        },
        classNameComponent: className,
        baseCn: cn(styles.fieldWrapper, {
            [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
        }),
    });
    return (_jsxs(WrapperElement, { className: componentClassNames, ...dataAttributes, ...innerProps, children: [isLabel && field?.['#title'] && (_jsx(TitleComponent, { wrapperElement: labelWrapperElement, components: components, classNamePrefix: classNamePrefix, field: field, fieldKey: fieldKey, unstyled: unstyled })), _jsx(WrapperField, { field: field, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: children }), (field?.['#description'] || field?.['#file_placeholder']) && (_jsx(WrapperDescription, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, components: components, unstyled: unstyled })), field['#type'] === 'managed_file' && (_jsx(WrapperManagedFileInfo, { fieldKey: fieldKey, field: field, components: components, classNamePrefix: classNamePrefix, unstyled: unstyled })), field?.['#more'] && field?.['#more_title'] && (_jsx(WrapperMore, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, components: components, unstyled: unstyled }))] }));
};
export default React.memo(FieldContainer);
