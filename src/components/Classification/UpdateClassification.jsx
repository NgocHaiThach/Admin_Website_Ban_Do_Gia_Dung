import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { updateOneClassification } from '../../reudx/Classification/apiFuntionClassification';
import InputField from '../InputField';
import cookies from 'react-cookies';


function UpdateClassification(props) {

    const adminInfo = cookies.load('admin');

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
    const history = useHistory();

    const { id } = useParams();
    let listClassification = useSelector(state => state.classification.list);

    listClassification = listClassification.filter((item) => {
        return (item.classificationId).toLowerCase() === id.toLowerCase();
    })
    console.log('list', listClassification)



    return (
        <Container>
            <Row>
                <h3 className='mb-4 mt-4'>Cập nhật danh mục sản phẩm</h3>
                <Formik
                    initialValues={
                        {
                            classificationId: listClassification[0].classificationId || '',
                            name: listClassification[0].name || '',
                            imageMenu: listClassification[0].imageMenu || '',
                            imageBanner: listClassification[0].imageBanner || '',
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const { classificationId, name, imageMenu, imageBanner } = values;
                        console.log(classificationId, name, imageMenu, imageBanner)
                        updateOneClassification(dispatch, classificationId, name, imageMenu, imageBanner)
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
                                Cập Nhật Danh Mục

                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Danh Mục Sản Phẩm Cập Nhật Thành Công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        history.push('/classification');
                    }}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default UpdateClassification;