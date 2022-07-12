import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { updateOneCategory } from '../../reudx/Categories/apiFuntionCategory';
import InputField from '../InputField';
import cookies from 'react-cookies';


function UpdateCategories(props) {

    const adminInfo = cookies.load('admin');


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
    const history = useHistory();

    const { id } = useParams();
    let listEmployee = useSelector(state => state.category.list);

    listEmployee = listEmployee.filter((item) => {
        return (item.categoryId).toLowerCase() === (id).toLowerCase()
    })

    return (
        <Container>
            {adminInfo ?
                <Row>
                    <h3 className='mb-4 mt-4'>Cập nhật loại sản phẩm</h3>
                    <Formik
                        initialValues={
                            {
                                categoryId: listEmployee[0]?.categoryId,
                                classificationId: listEmployee[0]?.classificationId,
                                name: listEmployee[0]?.name,
                                slogan: listEmployee[0]?.slogan,
                                image: listEmployee[0]?.image,
                                advantages1: listEmployee[0]?.advantages[0]?.content,
                                advantages2: listEmployee[0]?.advantages[1]?.content,
                                advantages3: listEmployee[0]?.advantages[2]?.content,
                                advantages4: listEmployee[0]?.advantages[3]?.content,
                            }
                        }
                        validationSchema={validate}
                        onSubmit={(values) => {
                            const { categoryId,
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
                            updateOneCategory(dispatch,
                                categoryId,
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
                                <InputField label="Mã Danh Mục" name="classificationId" type="text" />
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
                                    Cập Nhật Loại Sản Phẩm

                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Row>
                : <div>Vui lòng đăng nhập</div>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Loại Sản Phẩm Cập Nhật Thành Công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        history.push('/categorise');
                    }}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default UpdateCategories;