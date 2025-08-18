'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import DOMPurify from 'isomorphic-dompurify';
import styles from './field.module.scss';
import cn from 'classnames';
export const renderMarkup = ({ field, key, classNames }) => {
    var _a, _b, _c;
    if (!((field === null || field === void 0 ? void 0 : field['#markup']) && ((_a = field === null || field === void 0 ? void 0 : field['#markup']) === null || _a === void 0 ? void 0 : _a.length) > 0)) {
        return null;
    }
    return (_jsx("div", { className: cn(...((_c = (_b = field === null || field === void 0 ? void 0 : field['#attributes']) === null || _b === void 0 ? void 0 : _b.class) !== null && _c !== void 0 ? _c : []), classNames.fields.markup.base, styles.fieldWrapper), dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(field['#markup'], {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['target'],
            }),
        } }, key));
};
//# sourceMappingURL=markup.js.map