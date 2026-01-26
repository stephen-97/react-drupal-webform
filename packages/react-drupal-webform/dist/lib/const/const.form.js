import { jsx as _jsx } from "react/jsx-runtime";
import Wysiwyg from '../../components/form/fields/fields-special-components/wysiwyg/wysiwyg';
import Input from '../../components/form/fields/fields-elements/input';
import Title from '../../components/form/fields/fields-sub-components/title/title';
import Checkbox from '../../components/form/fields/fields-elements/checkbox';
import Checkboxes from '../../components/form/fields/fields-elements/checkboxes';
import Hidden from '../../components/form/fields/fields-elements/hidden';
import ManagedFile from '../../components/form/fields/fields-elements/managedFile';
import Radios from '../../components/form/fields/fields-elements/radios';
import Select from '../../components/form/fields/fields-elements/select';
import Textarea from '../../components/form/fields/fields-elements/textarea';
import FieldContainer from '../../components/form/fields/fields-sub-components/fieldContainer';
import { Action } from '../../components/form/fields/action';
import Help from '../../components/form/fields/fields-sub-components/help/help';
import More from '../../components/form/fields/fields-sub-components/more/more';
import Description from '../../components/form/fields/fields-sub-components/description/description';
import Form from '../../components/form/form';
import Markup from '../../components/form/fields/markup';
import Layout from '../../components/form/fields/fields-sub-components/layout/layout';
import LayoutTitle from '../../components/form/fields/fields-sub-components/layoutTitle/layoutTitle';
import LayoutList from '../../components/form/fields/fields-sub-components/layoutList/layoutList';
export const defaultValuesObj = {
    textfield: '',
    textarea: '',
    email: '',
    radios: '',
    checkboxes: [],
    checkbox: false,
    number: '',
    tel: '',
    date: '',
    managed_file: {},
    select: '',
    hidden: '',
    term_checkboxes: [],
    term_select: '',
    entity_select: '',
    entity_checkboxes: [],
    radios_entity: '',
};
export const defaultValuesFieldStateMessages = {
    general: {
        errorMessage: '',
        requiredMessage: 'Field "{fieldName}" is required.',
        minLengthMessage: 'Field "{fieldName}" must contain at least {minLength} characters.',
        maxLengthMessage: 'Field "{fieldName}" must contain no more than {maxLength} characters.',
    },
    fields: {
        errorMessages: {
            textfield: '',
            textarea: '',
            email: 'Please enter a valid email address (e.g., name@example.com).',
            number: 'Please enter a number.',
            tel: 'Please enter a valid phone number.',
            date: 'Invalid date format.',
            managed_file: '',
            radios: '',
            hidden: '',
            checkbox: '',
            checkboxes: '',
            select: '',
            entity_checkboxes: '',
            term_checkboxes: '',
            radios_entity: '',
            entity_select: '',
            term_select: '',
        },
        requiredMessages: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            managed_file: '',
            select: '',
            hidden: '',
            entity_checkboxes: '',
            term_checkboxes: '',
            radios_entity: '',
            entity_select: '',
            term_select: '',
        },
        minLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
            entity_checkboxes: '',
            term_checkboxes: '',
            radios_entity: '',
            entity_select: '',
            term_select: '',
        },
        maxLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
            entity_checkboxes: '',
            term_checkboxes: '',
            radios_entity: '',
            entity_select: '',
            term_select: '',
        },
    },
};
export const FIELD_TYPE_TO_GROUP = {
    textfield: 'input',
    email: 'input',
    number: 'input',
    tel: 'input',
    date: 'input',
    textarea: 'textarea',
    select: 'select',
    radios: 'radio',
    checkbox: 'checkbox',
    checkboxes: 'checkbox',
    managed_file: 'file',
    webform_section: 'layout',
    webform_flexbox: 'layout',
    fieldset: 'layout',
    container: 'layout',
    details: 'layout',
    webform_actions: 'action',
    webform_markup: 'markup',
};
export const components = {
    Input: (props) => _jsx(Input, { ...props }),
    Wysiwyg: (props) => _jsx(Wysiwyg, { ...props }),
    Title: (props) => _jsx(Title, { ...props }),
    Checkbox: (props) => _jsx(Checkbox, { ...props }),
    Checkboxes: (props) => (_jsx(Checkboxes, { ...props })),
    Hidden: (props) => _jsx(Hidden, { ...props }),
    ManagedFile: (props) => (_jsx(ManagedFile, { ...props })),
    Radios: (props) => _jsx(Radios, { ...props }),
    Select: (props) => _jsx(Select, { ...props }),
    TextArea: (props) => _jsx(Textarea, { ...props }),
    FieldContainer: (props) => (_jsx(FieldContainer, { ...props })),
    Action: (props) => _jsx(Action, { ...props }),
    Help: (props) => _jsx(Help, { ...props }),
    More: (props) => _jsx(More, { ...props }),
    Form: (props) => _jsx(Form, { ...props }),
    Markup: (props) => _jsx(Markup, { ...props }),
    Layout: (props) => _jsx(Layout, { ...props }),
    LauyoutTitle: (props) => (_jsx(LayoutTitle, { ...props })),
    LayoutList: (props) => (_jsx(LayoutList, { ...props })),
    Description: (props) => (_jsx(Description, { ...props })),
};
