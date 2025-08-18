import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from "../wrapper.module.scss";
import More from "../more/more";
const WrapperMore = ({ components, classNames, fieldMore, fieldMoreTitle, }) => {
    var _a;
    const CustomMore = (_a = components === null || components === void 0 ? void 0 : components.more) !== null && _a !== void 0 ? _a : More;
    return (_jsx(CustomMore, { innerPropsContainer: {
            className: classNames.general.fieldMore,
        }, innerPropsWysiwyg: {
            className: cn(styles.wysiwyg, classNames.general.fieldWysiwyg),
            processed: fieldMore,
        }, customComponentWysiwyg: components.wysiwyg, moreTitle: fieldMoreTitle }));
};
export default React.memo(WrapperMore);
//# sourceMappingURL=wrapperMore.js.map