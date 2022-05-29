import React, { useEffect, useState } from 'react';
import InputField from '../InputField';
import * as Yup from "yup";
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { FastField, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../reudx/Categories/apiFuntionCategory';
import { getListClassification } from '../../reudx/Classification/apiFuntionClassification';
import SelectField from '../SelectField';

function AddCategories(props) {
    const validate = Yup.object({
        categoryId: Yup.string()
            .max(40, "Tên phải ngắn hơn 10 ký tự")
            .required("Trường này bắt buộc"),
        classificationId: Yup.string()
            .max(40, "Tên phải ngắn hơn 10 ký tự")
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        slogan: Yup.string()
            .required("Trường này bắt buộc"),
        image: Yup.string()
            .required("Trường này bắt buộc"),
        advantages1: Yup.string()
            .required("Trường này bắt buộc"),
        advantages2: Yup.string()
            .required("Trường này bắt buộc"),
        advantages3: Yup.string()
            .required("Trường này bắt buộc"),
        advantages4: Yup.string()
            .required("Trường này bắt buộc"),
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getListClassification(dispatch);
    }, [])
    const listClassification = useSelector(state => state.classification.list);

    let CLASSCIFICATION_OPTIONS = [];
    for (let i = 1; i <= listClassification.length; i++) {
        CLASSCIFICATION_OPTIONS.push({
            value: i,
            label: listClassification[i]?.classificationId
        })
    }

    return (
        <Container>
            <Row>
                <Formik
                    initialValues={
                        {
                            categoryId: "",
                            classificationId: "",
                            name: "",
                            slogan: "",
                            image: "",
                            advantages1: "",
                            advantages2: "",
                            advantages3: "",
                            advantages4: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const {
                            categoryId,
                            classificationId,
                            name,
                            slogan,
                            image,
                            advantages1,
                            advantages2,
                            advantages3,
                            advantages4,
                        } = values;
                        console.log(
                            categoryId,
                            classificationId,
                            name,
                            slogan,
                            image,
                            advantages1,
                            advantages2,
                            advantages3,
                            advantages4,
                        )
                        addCategory(dispatch, categoryId,
                            classificationId,
                            name,
                            slogan,
                            image,
                            advantages1,
                            advantages2,
                            advantages3,
                            advantages4)
                        handleShow()
                    }}
                >
                    {(formik) => (
                        <Form>
                            <InputField label="Mã Loại" name="categoryId" type="text" />
                            {/* <InputField label="Mã Danh Mục" name="classificationId" type="text" /> */}
                            <FastField
                                name="classificationId"
                                component={SelectField}

                                label="Loại"
                                placeholder="Mã danh mục"
                                options={CLASSCIFICATION_OPTIONS}
                            />
                            <InputField label="Tên" name="name" type="text" />
                            <InputField label="Slogan" name="slogan" type="text" />
                            <InputField label="Ảnh" name="image" type="text" />
                            <InputField label="Mô tả" name="advantages1" type="text" />
                            <InputField label="Mô tả" name="advantages2" type="text" />
                            <InputField label="Mô tả" name="advantages3" type="text" />
                            <InputField label="Mô tả" name="advantages4" type="text" />

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
                                Thêm Loại Sản Phẩm

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

export default AddCategories;