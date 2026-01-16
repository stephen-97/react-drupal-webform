import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './form.module.scss';
const Form = ({ children, onSubmit, className, innerProps }) => {
    return (_jsx("form", { className: cn(styles.form, className), onSubmit: onSubmit, ...innerProps, children: children }));
};
export default Form;
