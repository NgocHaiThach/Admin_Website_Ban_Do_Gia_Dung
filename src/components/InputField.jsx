import React from "react";
import { ErrorMessage, useField } from "formik";
const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2" style={{ width: '800px' }}>
            <label htmlFor={field.name}>{label}</label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"
                    }`}
                {...field}
                {...props}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="valid-form__message" />
        </div>
    );
};
export default InputField;