import React, { useEffect, useState } from 'react';
import { FastField, Form, Formik } from 'formik';
import { Button, Container, FormGroup, FormLabel, InputGroup, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputField from '../InputField';
import * as Yup from "yup";
import { addEmployee } from '../../reudx/apiFuntion';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from '../SelectField';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';



function AddEmployee(props) {
    const validate = Yup.object({
        id: Yup.string()
            .max(10, "Tên phải ngắn hơn 10 ký tự")
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        category: Yup.string()
            .max(50, "Loại phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        price: Yup.string()
            .required("Trường này bắt buộc"),
        quantity: Yup.string()
            .required("Trường này bắt buộc"),
        avatar: Yup.string()
            .required("Trường này bắt buộc"),
        image1: Yup.string()
            .required("Trường này bắt buộc"),
        image2: Yup.string()
            .required("Trường này bắt buộc"),
        image3: Yup.string()
            .required("Trường này bắt buộc"),
        image4: Yup.string()
            .required("Trường này bắt buộc"),

    });


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getListCategory(dispatch);
    }, [])
    const listCategory = useSelector(state => state.category.list);

    let CATEGORY_OPTIONS = [];
    for (let i = 1; i <= listCategory.length; i++) {
        CATEGORY_OPTIONS.push({
            value: i,
            label: listCategory[i]?.categoryId
        })
    }
    // const CATEGORY_OPTIONS = [
    //     { value: 1, label: 'Technology' },
    //     { value: 2, label: 'Education' },
    //     { value: 3, label: 'Nature' },
    //     { value: 4, label: 'Animals' },
    //     { value: 5, label: 'Styles' },
    // ];

    return (
        <Container className='mb-40'>
            <Row>
                <Formik
                    initialValues={
                        {
                            id: "",
                            name: "",
                            category: "",
                            price: "",
                            quantity: "",
                            description: "",
                            avatar: "",
                            image1: "",
                            image2: "",
                            image3: "",
                            image4: "",

                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const {
                            id,
                            name,
                            category,
                            price,
                            quantity,
                            description,
                            avatar,
                            image1,
                            image2,
                            image3,
                            image4,
                        } = values;

                        console.log(
                            id,
                            name,
                            category,
                            price,
                            quantity,
                            description,
                            avatar,
                            image1,
                            image2,
                            image3,
                            image4,
                        )

                        addEmployee(dispatch,
                            id,
                            name,
                            category,
                            price,
                            quantity,
                            description,
                            avatar,
                            image1,
                            image2,
                            image3,
                            image4)
                        handleShow()
                    }}
                >
                    {(formik) => (
                        <Form>
                            <InputField label="Mã" name="id" type="text" />
                            <InputField label="Tên" name="name" type="text" />
                            {/* <InputField label="Loại" name="category" type="text" /> */}
                            <FastField
                                name="category"
                                component={SelectField}

                                label="Loại"
                                placeholder="Mã loại sản phẩm"
                                options={CATEGORY_OPTIONS}
                            />
                            <InputField label="Giá" name="price" type="text" />
                            <InputField label="Số lượng" name="quantity" type="text" />
                            <InputField label="Mô tả" name="description" type="text" />
                            <InputField label="Avatar" name="avatar" type="text" />
                            <InputField label="Ảnh 1" name="image1" type="text" />
                            <InputField label="Ảnh 2" name="image2" type="text" />
                            <InputField label="Ảnh 3" name="image3" type="text" />
                            <InputField label="Ảnh 4" name="image4" type="text" />

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
                                Thêm Sản Phẩm

                            </Button>
                        </Form>
                    )}
                </Formik>
            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thêm sản phẩm thành công!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default AddEmployee;