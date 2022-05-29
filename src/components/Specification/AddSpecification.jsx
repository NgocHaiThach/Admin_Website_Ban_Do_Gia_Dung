import React, { useState } from 'react';
import InputField from '../InputField';
import * as Yup from "yup";
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addSpecification } from '../../reudx/Specification/apiSpecification';

function AddSpecification(props) {
    const validate = Yup.object({
        specificationId: Yup.string()
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
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
                            specificationId: "",
                            name: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const { specificationId, name } = values;
                        console.log(specificationId, name)
                        addSpecification(dispatch, specificationId, name)
                        handleShow()
                    }}
                >
                    {(formik) => (
                        <Form>
                            <InputField label="Mã" name="specificationId" type="text" />
                            <InputField label="Tên" name="name" type="text" />
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
                                Thêm Thông Số Sản Phẩm

                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thêm Thông Số Sản Phẩm Thành Công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AddSpecification;