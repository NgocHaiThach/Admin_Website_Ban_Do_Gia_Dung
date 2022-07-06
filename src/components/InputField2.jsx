import React, { useEffect, useState } from "react";
import { ErrorMessage, useField } from "formik";
const InputField2 = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [selectedFile, setSelectedFile] = useState([]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile((p) => [...p, e.target.files[0]]);
        // console.log("picture", e.target.files[0])
        getBase64(e.target.files[0]);
    }

    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    const [contentPicture, setContentPicure] = useState([]);


    const onLoad = fileString => {
        var strImage = fileString.replace(/^data:image\/[a-z]+;base64,/, "");
        // console.log('length', strImage);
        setContentPicure((p) => [...p, strImage]);

    };
    console.log("file", contentPicture)

    return (
        <div className="mb-2" style={{ width: '800px' }}>
            <label htmlFor={field.name}>{label}</label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"
                    }`}
                {...field}
                {...props}
                autoComplete="off"
                onChange={(e) => onSelectFile(e)}
            />
            <ErrorMessage component="div" name={field.name} className="valid-form__message" />
        </div>
    );
};
export default InputField2;