import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './wrapper.module.scss';
import { getWrapperCategory } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import WrapperField from './wrapper-sub-components/wrapperField';
import WrapperDescription from './wrapper-sub-components/wrapperDescription';
import WrapperMore from './wrapper-sub-components/wrapperMore';
import WrapperManagedFileInfo from './wrapper-sub-components/wrapperManagedFileInfo';
import Title from './title/title';
const Wrapper = (props) => {
    const { children, field, classNames, isLabel = true, stateError, components, fieldKey, wrapperElement = 'div', } = props;
    const CustomWrapper = components?.wrapper;
    if (CustomWrapper) {
        return _jsx(CustomWrapper, { ...props, children: children });
    }
    const TitleComponent = components?.title ?? Title;
    const wrapperCategory = getWrapperCategory(field['#type']);
    const WrapperElement = wrapperElement;
    const labelWrapperElement = field?.['#type'] === 'checkboxes' || field?.['#type'] === 'radios'
        ? 'legend'
        : 'label';
    return (_jsxs(WrapperElement, { className: cn(...(field?.['#attributes']?.class ?? []), classNames.wrappers?.byFieldType?.[field['#type']], wrapperCategory
            ? classNames.wrappers?.byCategory?.[wrapperCategory]
            : undefined, classNames.wrappers?.base, {
            [classNames.states.fieldError ?? '']: Boolean(stateError),
            [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
        }, styles.fieldWrapper), children: [isLabel && field?.['#title'] && (_jsx(TitleComponent, { wrapperElement: labelWrapperElement, components: components, classNames: classNames, field: field, fieldKey: fieldKey })), _jsx(WrapperField, { field: field, classNames: classNames, components: components, stateError: stateError, children: children }), (field?.['#description'] || field?.['#file_placeholder']) && (_jsx(WrapperDescription, { field: field, classNames: classNames, components: components })), field['#type'] === 'managed_file' && (_jsx(WrapperManagedFileInfo, { field: field, components: components })), field?.['#more'] && field?.['#more_title'] && (_jsx(WrapperMore, { fieldMore: field['#more'], fieldMoreTitle: field['#more_title'], classNames: classNames, components: components }))] }));
};
export default React.memo(Wrapper);
