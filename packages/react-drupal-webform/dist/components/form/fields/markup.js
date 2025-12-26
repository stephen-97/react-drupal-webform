import { jsx as _jsx } from "react/jsx-runtime";
import DOMPurify from 'isomorphic-dompurify';
import styles from './field.module.scss';
import cn from 'classnames';
export const renderMarkup = (props) => {
    const { field, fieldKey, classNames, components } = props;
    if (!(field?.['#markup'] && field?.['#markup']?.length > 0)) {
        return null;
    }
    const CustomMarkup = components?.fieldById?.[fieldKey] ?? components?.markup;
    if (CustomMarkup) {
        return _jsx(CustomMarkup, { ...props });
    }
    return (_jsx("div", { className: cn(...(field?.['#attributes']?.class ?? []), classNames.fields.markup.base, styles.fieldWrapper), dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(field['#markup'], {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['target'],
            }),
        } }, fieldKey));
};
