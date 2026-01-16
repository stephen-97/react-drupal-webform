import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg';
const Markup = (props) => {
    const { field, classNames, components, className } = props;
    const markup = field?.['#markup'];
    if (!markup?.length)
        return null;
    const WysiwygComponent = components?.wysiwyg ?? Wysiwyg;
    return (_jsx("div", { className: cn(...(field?.['#attributes']?.class ?? []), classNames.fields.markup.base, className), children: _jsx(WysiwygComponent, { processed: markup, source: "markup" }) }));
};
export const renderMarkup = (props) => {
    const { fieldKey, field, components } = props;
    if (!field?.['#markup']?.length)
        return null;
    const MarkupComponent = components?.fieldById?.[fieldKey] ?? components?.markup ?? Markup;
    return _jsx(MarkupComponent, { ...props });
};
export default Markup;
