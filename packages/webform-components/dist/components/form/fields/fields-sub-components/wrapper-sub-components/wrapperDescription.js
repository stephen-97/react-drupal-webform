import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import styles from "../wrapper.module.scss";
import cn from 'classnames';
import Description from "../description/description";
const WrapperDescription = ({ components, classNames, field, }) => {
    var _a, _b;
    const CustomDescription = (_a = components === null || components === void 0 ? void 0 : components.description) !== null && _a !== void 0 ? _a : Description;
    return (_jsx(CustomDescription, { custom_component_wysiwyg: components.wysiwyg, innerProps: {
            className: cn(classNames.general.fieldDescription, styles.wysiwyg, classNames.general.fieldWysiwyg),
        }, processed: ((_b = field === null || field === void 0 ? void 0 : field['#description']) !== null && _b !== void 0 ? _b : field === null || field === void 0 ? void 0 : field['#file_placeholder']) || '' }));
};
export default React.memo(WrapperDescription);
//# sourceMappingURL=wrapperDescription.js.map