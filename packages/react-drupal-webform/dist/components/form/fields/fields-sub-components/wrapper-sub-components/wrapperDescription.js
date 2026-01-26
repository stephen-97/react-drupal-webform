import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Description from '../description/description';
const WrapperDescription = ({ components, field, fieldKey, classNamePrefix, unstyled, }) => {
    const CustomDescription = components?.description ?? Description;
    return (_jsx(CustomDescription, { unstyled: unstyled, components: components, field: field, classNamePrefix: classNamePrefix, fieldKey: fieldKey }));
};
export default React.memo(WrapperDescription);
