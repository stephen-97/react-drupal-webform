import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Description from '../description/description';
const WrapperDescription = ({ components, classNames, field, }) => {
    const CustomDescription = components?.description ?? Description;
    return (_jsx(CustomDescription, { components: components, classNames: classNames, field: field }));
};
export default React.memo(WrapperDescription);
