import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Label from '../label/label';
const WrapperLabel = ({ components, classNames, field, fieldKey, }) => {
    const CustomLabel = components?.label ?? Label;
    const wrapperElement = field?.['#type'] === 'checkboxes' || field?.['#type'] === 'radios'
        ? 'legend'
        : 'label';
    return (_jsx(CustomLabel, { wrapperElement: wrapperElement, fieldKey: fieldKey, components: components, classNames: classNames, field: field }));
};
export default React.memo(WrapperLabel);
