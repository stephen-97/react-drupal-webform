import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ManagedFileInfo from '../managedFileInfo/managedFileInfo';
const WrapperManagedFileInfo = ({ field, components, fieldKey, classNamePrefix, unstyled, }) => {
    const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo;
    return (_jsx(CustomManagedFileInfo, { components: components, field: field, classNamePrefix: classNamePrefix, fieldKey: fieldKey, unstyled: unstyled }));
};
export default React.memo(WrapperManagedFileInfo);
