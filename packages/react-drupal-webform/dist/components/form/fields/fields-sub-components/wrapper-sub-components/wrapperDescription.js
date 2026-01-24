import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Description from '../description/description';
const WrapperDescription = ({ components, classNames, field, fieldKey, classNamePrefix, }) => {
    const CustomDescription = components?.description ?? Description;
    return (_jsx(CustomDescription, { components: components, classNames: classNames, field: field, classNamePrefix: classNamePrefix, fieldKey: fieldKey }));
};
export default React.memo(WrapperDescription);
