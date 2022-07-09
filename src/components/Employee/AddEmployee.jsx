import { FastField, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addEmployee } from '../../reudx/apiFuntion';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';
import { getListSpecification } from '../../reudx/Specification/apiSpecification';
import InputField from '../InputField';
import SelectField from '../SelectField';
import SubTable from './SubTable';

import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';







function AddEmployee(props) {
    const validate = Yup.object({
        id: Yup.string()
            .max(10, "Tên phải ngắn hơn 10 ký tự")
            .required("Trường này bắt buộc"),
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        category: Yup.string()
            .required("Trường này bắt buộc"),
        price: Yup.string()
            .required("Trường này bắt buộc"),
        avatar: Yup.string()
            .required("Trường này bắt buộc"),
        weight: Yup.string()
            .required("Trường này bắt buộc"),
        length: Yup.string()
            .required("Trường này bắt buộc"),
        width: Yup.string()
            .required("Trường này bắt buộc"),
        height: Yup.string()
            .required("Trường này bắt buộc"),
        highlights: Yup.string()
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
            value: listCategory[i]?.categoryId,
            label: listCategory[i]?.name
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



    const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {

        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked) {

                return checked.filter(item => item !== id)
            }
            else {
                return [...prev, id,]
            }
        })
    }

    let listObjId = [];

    for (let i = 0; i < checked.length; i++) {
        listObjId.push({ specificationId: checked[i], value: '' })
    }
    listObjId.sort((a, b) => {
        if (a.specificationId < b.specificationId) { return -1; }
        if (a.specificationId > b.specificationId) { return 1; }
        return 0;
    });

    // console.log("listObjId", listObjId);

    const { register, control, handleSubmit, reset, trigger, setError, formState: { errors } } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
        resolver: yupResolver(validate)
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });

    const onSubmit = (data, e) => {
        // e.preventDefault();
        const { avatar, category, height, highlights, id, length, name, price, weight, width } = data;

        const b = []

        for (const property in data.test) {
            if (data.test[property].value !== "") {
                b.push({ id: property, value: data.test[property].value });
            }
        }

        for (let i = 0; i < listObjId.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (listObjId[i].specificationId === b[j].id) {
                    // if (listObjId[i].productId === b[j].key) {
                    listObjId[i].value = b[j].value;
                    // }
                }
            }
        }

        const description = highlights.split("; ");

        listObjId = listObjId.filter((item) => item.value !== 'none' && item.value !== undefined);

        addEmployee(dispatch,
            id, name, category, price, description,
            avatar, contentPicture, weight,
            length, width, height, listObjId,
        );
        handleShow();
    }

    return (
        <Container className='mb-5 mt-5'>
            <h3 className='mb-4'>Thêm sản phẩm</h3>
            <Row>
                {/* <Formik
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
                </Formik> */}
                {/* <SubTable titleData={titleData} listSpecification={listSpecification} /> */}
            </Row>

            <Row>
                <div className="panel-body mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <p className="form-group">
                            <label>Mã Sản Phẩm</label>
                            <input
                                name="id"
                                className="form-control max-width"
                                type="text"
                                {...register("id")}
                            />
                        </p>
                        {errors?.id?.type === "required" && <p className="valid-form__message">* Vui lòng nhập mã sản phẩm</p>}
                        {errors?.id?.type === "max" && <p className="valid-form__message">* Tên phải ngắn hơn 10 ký tự</p>}

                        <p className="form-group">
                            <label>Tên Sản Phẩm</label>
                            <input
                                name="name"
                                className="form-control max-width"
                                type="text"
                                {...register("name")}
                            />
                        </p>
                        {errors?.name?.type === "required" && <p className="valid-form__message">* Vui lòng nhập tên sản phẩm</p>}
                        {errors?.name?.type === "max" && <p className="valid-form__message">* Tên phải ngắn hơn 50 ký tự</p>}

                        <p className="form-group">
                            <label>Giá sản phẩm</label>
                            <input
                                name="price"
                                className="form-control max-width"
                                type="text"
                                {...register("price")}
                            />
                        </p>
                        {errors?.price?.type === "required" && <p className="valid-form__message">* Vui lòng nhập giá sản phẩm</p>}

                        <p className="form-group">
                            <label>Avatar sản phẩm</label>
                            <input
                                name="avatar"
                                className="form-control max-width"
                                type="text"
                                {...register("avatar")}
                            />
                        </p>
                        {errors?.avatar?.type === "required" && <p className="valid-form__message">* Vui lòng nhập link avatar sản phẩm</p>}

                        <p className="form-group">
                            <label>Loại Sản Phẩm</label>
                            <br />
                            <select className="form-control max-width"  {...register("category")}>
                                {CATEGORY_OPTIONS.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </p>
                        {errors?.category?.type === "required" && <p className="valid-form__message">* Vui chọn loại sản phẩm</p>}

                        <p className="form-group">
                            <label>Khối lượng sản phẩm (g)</label>
                            <input
                                name="weight"
                                className="form-control max-width"
                                type="text"
                                {...register("weight")}
                            />
                        </p>
                        {errors?.weight?.type === "required" && <p className="valid-form__message">* Vui lòng nhập khối lượng sản phẩm</p>}

                        <p className="form-group">
                            <label>Chiều dài sản phẩm (cm)</label>
                            <input
                                name="length"
                                className="form-control max-width"
                                type="text"
                                {...register("length")}
                            />
                        </p>
                        {errors?.length?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều dài sản phẩm</p>}

                        <p className="form-group">
                            <label>Chiều rộng sản phẩm (cm)</label>
                            <input
                                name="width"
                                className="form-control max-width"
                                type="text"
                                {...register("width")}
                            />
                        </p>
                        {errors?.width?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều rộng sản phẩm</p>}

                        <p className="form-group">
                            <label>Chiều cao sản phẩm (cm)</label>
                            <input
                                name="height"
                                className="form-control max-width"
                                type="text"
                                {...register("height")}
                            />
                        </p>
                        {errors?.height?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều cao sản phẩm</p>}

                        <p className="form-group">
                            <label>Đặc điểm sản phẩm</label>
                            <input
                                name="highlights"
                                className="form-control max-width"
                                type="text"
                                {...register("highlights")}
                            />
                        </p>
                        {errors?.highlights?.type === "required" && <p className="valid-form__message">* Vui lòng nhập đặc điểm sản phẩm</p>}



                        <label>Thông số sản phẩm</label>
                        <Table className="mt-2" striped bordered hover style={{ width: '800px' }}>
                            <thead>
                                <tr>
                                    {titleData.map((title, index) => (
                                        <th key={index}>
                                            {title.field}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {listSpecification.map((spec, index) => (
                                <tbody key={index}>
                                    <tr key={index}>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={checked.includes(spec.specificationId)}
                                                    onChange={() => handleCheck(spec.specificationId)}
                                                />
                                            </div>
                                        </td>
                                        <td>{spec.specificationId}</td>
                                        <td>{spec.name}</td>
                                        <td>
                                            <input {...register(`test.${spec.specificationId}.value`)} />
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                            <tfoot>
                                <tr>
                                    {titleData.map((title, index) => (
                                        <th key={index}>{title.field}</th>
                                    ))}
                                </tr>
                            </tfoot>
                        </Table>

                        <div>
                            <span>Ảnh mô tả</span>
                            <div>
                                <input
                                    ref={inputFile}
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
                            variant="primary"
                            type="submit"
                            className="col-md-2 mt-3 mb-3"
                            style={{ marginLeft: '15px' }}
                        // onClick={handleActions}

                        >
                            Xác nhận
                        </Button>
                    </form>
                </div>
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