import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ManagedFileInfo from "../managedFileInfo/managedFileInfo";
const WrapperManagedFileInfo = ({ field, components, }) => {
    var _a;
    const CustomManagedFileInfo = (_a = components === null || components === void 0 ? void 0 : components.managedFileInfo) !== null && _a !== void 0 ? _a : ManagedFileInfo;
    return _jsx(CustomManagedFileInfo, { field: field });
};
export default React.memo(WrapperManagedFileInfo);
//# sourceMappingURL=wrapperManagedFileInfo.js.map