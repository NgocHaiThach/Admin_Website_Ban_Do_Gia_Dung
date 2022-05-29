import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { updateOneEmployee, updateOneProduct } from '../../reudx/apiFuntion';
import InputField from '../InputField';



function UpdateEmployee(props) {

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
    const history = useHistory();

    const { id } = useParams();
    let listEmployee = useSelector(state => state.listEmployee.list);

    listEmployee = listEmployee.filter((item) => {
        return item.productId === id
    })

    console.log(listEmployee)


    return (
        <Container className="mb-40">
            <div>avb</div>
            <Formik
                initialValues={
                    {
                        id: listEmployee[0].productId,
                        name: listEmployee[0].name,
                        category: listEmployee[0].categoryId,
                        price: listEmployee[0].price,
                        quantity: 100,
                        description: listEmployee[0]?.highlights,
                        avatar: listEmployee[0]?.avatar,
                        image1: listEmployee[0]?.images[0],
                        image2: listEmployee[0]?.images[1],
                        image3: listEmployee[0]?.images[2],
                        image4: listEmployee[0]?.images[3],
                    }
                }
                validationSchema={validate}
                onSubmit={(values) => {
                    const { id,
                        name,
                        category,
                        price,
                        quantity,
                        description,
                        avatar,
                        image1,
                        image2,
                        image3,
                        image4, } = values;
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
                    updateOneProduct(dispatch,
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
                        <InputField label="Loại" name="category" type="text" />
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
                            Cập nhật sản phẩm

                        </Button>
                    </Form>
                )}
            </Formik>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sản phẩm cập nhật thành công!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        history.push('/');
                    }}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default UpdateEmployee;