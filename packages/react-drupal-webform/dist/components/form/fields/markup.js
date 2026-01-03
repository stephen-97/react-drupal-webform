import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg';
export const renderMarkup = (props) => {
    const { field, fieldKey, classNames, components } = props;
    if (!field?.['#markup']?.length) {
        return null;
    }
    const CustomMarkup = components?.fieldById?.[fieldKey] ?? components?.markup;
    if (CustomMarkup) {
        return _jsx(CustomMarkup, { ...props });
    }
    const CustomWysiwyg = components?.wysiwyg;
    if (CustomWysiwyg) {
        return (_jsx(CustomWysiwyg, { processed: field['#markup'], source: "markup", className: cn(...(field?.['#attributes']?.class ?? []), classNames.fields.markup.base) }));
    }
    return (_jsx(Wysiwyg, { processed: field['#markup'], source: "markup", className: cn(...(field?.['#attributes']?.class ?? []), classNames.fields.markup.base) }));
};
