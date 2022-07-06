import { FastField, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addEmployee } from '../../reudx/apiFuntion';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';
import { getListSpecification } from '../../reudx/Specification/apiSpecification';
import InputField from '../InputField';
import SelectField from '../SelectField';
import SubTable from './SubTable';




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
        avatar: Yup.string()
            .required("Trường này bắt buộc"),
        weight: Yup.number()
            .required("Trường này bắt buộc"),
        length: Yup.number()
            .required("Trường này bắt buộc"),
        width: Yup.number()
            .required("Trường này bắt buộc"),
        height: Yup.number()
            .required("Trường này bắt buộc"),
    });


    const titleData = [
        { name: 'choose', field: "Chọn", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên", sortable: 'none' },
        { name: 'quantity', field: "Nhập giá trị", sortable: 'none' },
    ]


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getListCategory(dispatch);
        getListSpecification(dispatch);
    }, []);

    const listCategory = useSelector(state => state.category.list);
    const listSpecification = useSelector(state => state.specification.list)

    let CATEGORY_OPTIONS = [];
    for (let i = 1; i <= listCategory.length; i++) {
        CATEGORY_OPTIONS.push({
            value: i,
            label: listCategory[i]?.categoryId
        })
    }

    const inputFile = useRef(null);

    const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState([]);
    const [contentPicture, setContentPicure] = useState([]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        let objectUrl = '';
        selectedFile?.map((item) => {
            objectUrl = URL.createObjectURL(item)
        })
        setPreview((p) => [...p, objectUrl])

        // free memory when ever this component is unmounted
        return () => {
            selectedFile.map(item => {
                URL.revokeObjectURL(item)
            })
        }
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiples
        setSelectedFile((p) => [...p, e.target.files[0]]);
        getBase64(e.target.files[0]);
    }

    const onLoad = fileString => {
        var strImage = fileString.replace(/^data:image\/[a-z]+;base64,/, "");
        setContentPicure((p) => [...p, strImage]);
    };

    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    return (
        <Container className='mb-5 mt-5'>
            <h3 className='mb-4'>Thêm sản phẩm</h3>
            <Row>
                <Formik
                    initialValues={
                        {
                            id: "", name: "", category: "",
                            price: "", quantity: "", description: "",
                            avatar: "", weight: "", length: "", width: "", height: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const {
                            id, name, category, price, description,
                            avatar, weight, length, width, height,
                        } = values;

                        addEmployee(dispatch,
                            id, name, category, price, description,
                            avatar, contentPicture, weight,
                            length, width, height)
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
                            <InputField label="Mô tả" name="description" type="text" />
                            <InputField label="Avatar" name="avatar" type="text" />
                            <InputField label="Khối lượng" name="weight" type="text" />
                            <InputField label="Độ dài" name="length" type="text" />
                            <InputField label="Chiều dài" name="width" type="text" />
                            <InputField label="Chiều cao" name="height" type="text" />

                            <div>
                                <span>Ảnh mô tả</span>
                                <div>
                                    <input
                                        ref={inputFile}
                                        // style={{ display: 'none' }}
                                        id="file"
                                        type="file"
                                        onChange={(e) => onSelectFile(e)}
                                    />
                                    {(preview?.slice(1))?.map((i, index) => (
                                        <img
                                            key={index}
                                            src={i}
                                            style={{ width: '50px', height: '50px', margin: '0 10px' }}
                                            alt="img"
                                        />
                                    ))}
                                </div>
                            </div>


                            <Button
                                variant="secondary"
                                className="mr-5 mt-4"
                                type='reset'
                            >

                                Reset
                            </Button>
                            <Button
                                variant="primary"
                                className="ml-5 mt-4"
                                type="submit"
                            >
                                Thêm Sản Phẩm

                            </Button>
                        </Form>
                    )}
                </Formik>
                <SubTable titleData={titleData} listSpecification={listSpecification} />
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