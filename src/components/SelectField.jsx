import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    options: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.string,
};

SelectField.defaultProps = {
    options: [],
    label: '',
    placeholder: '',
    disabled: false,
}

function SelectField(props) {
    const {
        field, form,
        options, label, placeholder, disabled,

    } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]
    const selectedOption = options.find(option => option.value === value)

    const handleSelectOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.label : selectedOption
        // console.log('options', selectedValue)

        const changEvent = {
            target: {
                name: name,
                value: selectedValue,
            }
        }

        field.onChange(changEvent)
    }

    return (
        <FormGroup style={{ width: '800px' }}>
            {label && <Label for={name}>{label}</Label>}
            <Select
                id={name}

                // = [..field]
                name={name}
                //value={value}
                // onChange={onChange}
                onBlur={() => form.setFieldTouched(name, true)}
                value={selectedOption}
                onChange={handleSelectOptionChange}

                disabled={disabled}
                options={options}
                placeholder={placeholder}

                className={showError ? 'is-invalid' : ''}
            />

            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default SelectField;