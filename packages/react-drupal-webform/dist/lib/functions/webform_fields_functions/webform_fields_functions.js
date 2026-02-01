import { fileToBase64 } from './webform_fields_file_functions';
const handleChangeOptions = (selectedKey, fieldController) => {
    fieldController.onChange(selectedKey);
};
const handleChangeOptionsCheckboxes = (selectedKey, checked, fieldController) => {
    let selectedKeys = Array.isArray(fieldController.value)
        ? [...fieldController.value]
        : [];
    if (checked && !selectedKeys.includes(selectedKey)) {
        selectedKeys.push(selectedKey);
    }
    else if (!checked) {
        selectedKeys = selectedKeys.filter((key) => key !== selectedKey);
    }
    fieldController.onChange(selectedKeys);
};
const handleFileChange = async (event, fieldController, inputRef) => {
    try {
        const { files } = event.target;
        if (files && files.length > 0 && inputRef?.current) {
            const file = files[0];
            const base64 = await fileToBase64(file);
            fieldController.onChange({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModified,
                base64,
            });
            inputRef.current.value = '';
        }
    }
    catch (err) {
        console.error('Error', err);
    }
};
export { handleChangeOptions, handleFileChange, handleChangeOptionsCheckboxes };
