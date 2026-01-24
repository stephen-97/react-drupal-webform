import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import More from '../more/more';
const WrapperMore = ({ components, classNames, classNamePrefix, field, fieldKey, }) => {
    const CustomMore = components?.more ?? More;
    return (_jsx(CustomMore, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, classNames: classNames, components: components }));
};
export default React.memo(WrapperMore);
