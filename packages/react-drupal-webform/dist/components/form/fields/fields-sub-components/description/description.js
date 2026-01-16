import { jsx as _jsx } from "react/jsx-runtime";
import 'tippy.js/dist/tippy.css';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
import cn from 'classnames';
import styles from '../wrapper.module.scss';
const Description = ({ innerProps, components, classNames, field, className, }) => {
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    return (_jsx(CustomWysiwyg, { className: cn(classNames.general?.fieldDescription, styles.wysiwyg, classNames.general?.fieldWysiwyg, className), processed: (field?.['#description'] ?? field?.['#file_placeholder']) || '', as: 'div', source: 'description', ...innerProps }));
};
export default Description;
