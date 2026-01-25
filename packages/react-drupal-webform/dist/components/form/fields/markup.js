import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg';
import { getClassNames, getDataAttributes, } from '../../../lib/functions/utils_functions';
const Markup = (props) => {
    const { field, fieldKey, components, className, classNamePrefix, innerProps, unstyled, classNames, } = props;
    const markup = field?.['#markup'];
    if (!markup?.length)
        return null;
    const WysiwygComponent = components?.wysiwyg ?? Wysiwyg;
    const markupClassNames = getClassNames({
        name: 'markup',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(...(field?.['#attributes']?.class ?? []), className),
    });
    const dataAttributes = getDataAttributes({
        component: 'markup',
    });
    return (_jsx("div", { className: markupClassNames, ...innerProps, ...dataAttributes, children: _jsx(WysiwygComponent, { classNamePrefix: classNamePrefix, processed: markup, fieldKey: fieldKey, field: field, classNames: classNames, components: components, unstyled: unstyled, source: "markup" }) }));
};
export const renderMarkup = (props) => {
    const { fieldKey, field, components } = props;
    if (!field?.['#markup']?.length)
        return null;
    const MarkupComponent = components?.fieldById?.[fieldKey] ?? components?.markup ?? Markup;
    return _jsx(MarkupComponent, { ...props });
};
export default Markup;
