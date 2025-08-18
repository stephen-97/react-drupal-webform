import { jsx as _jsx } from "react/jsx-runtime";
import styles from './loader.module.scss';
import cn from 'classnames';
const Loader = (props) => {
    const { innerProps } = props;
    return _jsx("span", { className: cn(styles.loader, innerProps === null || innerProps === void 0 ? void 0 : innerProps.className) });
};
export default Loader;
//# sourceMappingURL=loader.js.map