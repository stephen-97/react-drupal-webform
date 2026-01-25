import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import More from '../more/more';
const WrapperMore = ({ components, classNames, classNamePrefix, field, fieldKey, unstyled, }) => {
    const CustomMore = components?.more ?? More;
    return (_jsx(CustomMore, { field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, classNames: classNames, components: components, unstyled: unstyled }));
};
export default React.memo(WrapperMore);
