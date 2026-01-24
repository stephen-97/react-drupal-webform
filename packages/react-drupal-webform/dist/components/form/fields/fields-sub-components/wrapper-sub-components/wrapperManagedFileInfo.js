import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ManagedFileInfo from '../managedFileInfo/managedFileInfo';
const WrapperManagedFileInfo = ({ field, components, fieldKey, classNamePrefix, }) => {
    const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo;
    return (_jsx(CustomManagedFileInfo, { field: field, classNamePrefix: classNamePrefix, fieldKey: fieldKey }));
};
export default React.memo(WrapperManagedFileInfo);
