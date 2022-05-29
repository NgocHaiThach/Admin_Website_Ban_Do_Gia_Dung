import React, { useState } from 'react';
import InputField from '../InputField';
import * as Yup from "yup";
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addClassification } from '../../reudx/Classification/apiFuntionClassification';

function AddClassification(props) {
    const validate = Yup.object({
        classificationId: Yup.string()
            .max(10, "Tên phải ngắn hơn 10 ký tự")
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        imageMenu: Yup.string()
            .required("Trường này bắt buộc"),
        imageBanner: Yup.string()
            .required("Trường này bắt buộc"),
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    return (
        <Container>
            <Row>
                <Formik
                    initialValues={
                        {
                            classificationId: "",
                            name: "",
                            imageMenu: "",
                            imageBanner: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const { classificationId, name, imageMenu, imageBanner } = values;
                        console.log(classificationId, name, imageMenu, imageBanner)
                        addClassification(dispatch, classificationId, name, imageMenu, imageBanner)
                        handleShow()
                    }}
                >
                    {(formik) => (
                        <Form>
                            <InputField label="Mã" name="classificationId" type="text" />
                            <InputField label="Tên" name="name" type="text" />
                            <InputField label="Ảnh Menu" name="imageMenu" type="text" />
                            <InputField label="Ảnh Banner" name="imageBanner" type="text" />

                            <Button
                                variant="secondary"
                                className="mr-5"
                                type='reset'
                            >

                                Reset
                            </Button>
                            <Button
                                variant="primary"
                                className="ml-5"
                                type="submit"
                            >
                                Thêm Danh Mục Sản Phẩm

                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thêm Loại Sản Phẩm Thành Công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AddClassification;