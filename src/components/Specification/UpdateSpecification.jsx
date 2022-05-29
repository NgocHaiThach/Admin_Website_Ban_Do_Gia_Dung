import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateOneSpecification } from '../../reudx/Specification/apiSpecification';
import * as Yup from "yup";
import InputField from '../InputField';
import { useParams } from 'react-router-dom';

function UpdateSpecification(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const validate = Yup.object({
        specificationId: Yup.string()
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
    });


    let listSpecification = useSelector(state => state.specification.list);

    listSpecification = listSpecification.filter((item) => {
        return (item.specificationId).toLowerCase() === id.toLowerCase();
    })
    console.log('list', listSpecification)

    return (
        <Container>
            <Formik
                initialValues={
                    {
                        specificationId: listSpecification[0].specificationId || "",
                        name: listSpecification[0].name || "",
                    }
                }
                validationSchema={validate}
                onSubmit={(values) => {
                    const { specificationId, name } = values;
                    console.log(specificationId, name);
                    updateOneSpecification(dispatch, specificationId, name);
                    handleShow();

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
                            Cập Nhật Danh Mục

                        </Button>
                    </Form>
                )}
            </Formik>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Danh Mục Sản Phẩm Cập Nhật Thành Công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        history.push('/specification');
                    }}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default UpdateSpecification;