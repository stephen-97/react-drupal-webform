import { jsx as _jsx } from "react/jsx-runtime";
import 'tippy.js/dist/tippy.css';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
import cn from 'classnames';
import styles from './description.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const Description = ({ innerProps, components, field, fieldKey, className, classNamePrefix, unstyled, }) => {
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    const descriptionClassNames = getClassNames({
        name: 'description',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.descriptionWysiwyg),
    });
    const dataAttributes = getDataAttributes({
        component: 'description',
    });
    const mergedInnerProps = {
        id: innerProps?.id ?? `description-${fieldKey}`,
        ...innerProps,
    };
    return (_jsx(CustomWysiwyg, { components: components, field: field, fieldKey: fieldKey, className: descriptionClassNames, classNamePrefix: classNamePrefix, processed: (field?.['#description'] ?? field?.['#file_placeholder']) || '', as: 'div', source: 'description', innerProps: {
            ...dataAttributes,
            ...mergedInnerProps,
        }, unstyled: unstyled }));
};
export default Description;
