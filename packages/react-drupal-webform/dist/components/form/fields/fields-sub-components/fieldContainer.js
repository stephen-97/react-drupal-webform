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
    const { children, field, classNames, isLabel = true, components, fieldKey, wrapperElement = 'div', innerProps, className, classNamePrefix, } = props;
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
        hasError: Boolean(stateError),
        type: field['#type'],
        component: 'fieldContainer',
    });
    const componentClassNames = getClassNames({
        name: 'fieldContainer',
        prefix: classNamePrefix,
        baseCn: cn(styles.fieldWrapper, {
            [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
        }, className),
    });
    return (_jsxs(WrapperElement, { className: componentClassNames, ...dataAttributes, ...innerProps, children: [isLabel && field?.['#title'] && (_jsx(TitleComponent, { wrapperElement: labelWrapperElement, components: components, classNames: classNames, classNamePrefix: classNamePrefix, field: field, fieldKey: fieldKey })), _jsx(WrapperField, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, children: children }), (field?.['#description'] || field?.['#file_placeholder']) && (_jsx(WrapperDescription, { field: field, fieldKey: fieldKey, classNames: classNames, classNamePrefix: classNamePrefix, components: components })), field['#type'] === 'managed_file' && (_jsx(WrapperManagedFileInfo, { fieldKey: fieldKey, field: field, components: components, classNamePrefix: classNamePrefix })), field?.['#more'] && field?.['#more_title'] && (_jsx(WrapperMore, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, classNames: classNames, components: components }))] }));
};
export default React.memo(FieldContainer);
