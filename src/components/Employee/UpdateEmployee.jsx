import { Form, Formik, FastField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { setListEmployee, updateOneEmployee, updateOneProduct } from '../../reudx/apiFuntion';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';
import InputField from '../InputField';
import SelectField from '../SelectField';

import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from "react-hook-form";
import { getListSpecification } from '../../reudx/Specification/apiSpecification';
import cookies from 'react-cookies';

function UpdateEmployee(props) {

    const adminInfo = cookies.load('admin');


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
        // { name: 'choose', field: "Chọn", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên", sortable: 'none' },
        { name: 'quantity', field: "Nhập giá trị", sortable: 'none' },
    ]

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

    useEffect(() => {
        if (adminInfo) {
            getListCategory(dispatch);
            getListSpecification(dispatch);
        }
    }, []);

    const listCategory = useSelector(state => state.category.list);
    const listSpecification = useSelector(state => state.specification.list);


    let CATEGORY_OPTIONS = [];
    for (let i = 1; i <= listCategory.length; i++) {
        CATEGORY_OPTIONS.push({
            value: listCategory[i]?.categoryId,
            label: listCategory[i]?.categoryId
        })
    }

    const [product, setProduct] = useState({
        id: listEmployee[0]?.productId,
        name: listEmployee[0]?.name,
        category: listEmployee[0]?.categoryId,
        price: listEmployee[0]?.price,
        description: listEmployee[0]?.highlights,
        avatar: listEmployee[0]?.avatar,
        weight: listEmployee[0]?.weight,
        length: listEmployee[0]?.length,
        height: listEmployee[0]?.height,
        width: listEmployee[0]?.width,

        view: listEmployee[0]?.view,

    })
    const specifications = listEmployee[0]?.specifications;
    const [images, setImages] = useState(listEmployee[0]?.images);

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
                b.push({ specificationId: property, value: data.test[property].value });
            }
        }

        const desciption = (highlights.split("; "))
        const enable = true;
        updateOneProduct(dispatch, avatar, category, height, desciption, id, length, name, price, weight, width, b, images, enable);
        handleShow();
    }

    return (
        product &&
        <Container className="mb-40">
            {adminInfo ?
                <>
                    <h3 className='mt-4 mb-4'>Cập nhật sản phẩm</h3>
                    <Row>
                        <div className="panel-body mt-4">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <p className="form-group">
                                    <label>Mã Sản Phẩm</label>
                                    <input
                                        name="id"
                                        className="form-control max-width"
                                        type="text"
                                        defaultValue={product?.id}
                                        {...register("id")}
                                        onChange={(e) => setProduct(e.target.value)}
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
                                        defaultValue={product?.name}
                                        {...register("name")}
                                        onChange={(e) => setProduct(e.target.value)}
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
                                        defaultValue={product?.price}
                                        {...register("price")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.price?.type === "required" && <p className="valid-form__message">* Vui lòng nhập giá sản phẩm</p>}

                                <p className="form-group">
                                    <label>Avatar sản phẩm</label>
                                    <input
                                        name="avatar"
                                        className="form-control max-width"
                                        defaultValue={product?.avatar}
                                        type="text"
                                        {...register("avatar")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.avatar?.type === "required" && <p className="valid-form__message">* Vui lòng nhập link avatar sản phẩm</p>}

                                <p className="form-group">
                                    <label>Loại Sản Phẩm</label>
                                    <br />
                                    <select className="form-control max-width"  {...register("category")}>
                                        <option selected value={product?.category}>{product?.category}</option>

                                        {CATEGORY_OPTIONS?.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </p>
                                {errors?.category?.type === "required" && <p className="valid-form__message">* Vui chọn loại sản phẩm</p>}

                                <p className="form-group">
                                    <label>Khối lượng sản phẩm</label>
                                    <input
                                        name="weight"
                                        className="form-control max-width"
                                        defaultValue={product?.weight}
                                        type="text"
                                        {...register("weight")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.weight?.type === "required" && <p className="valid-form__message">* Vui lòng nhập khối lượng sản phẩm</p>}

                                <p className="form-group">
                                    <label>Chiều dài sản phẩm</label>
                                    <input
                                        name="length"
                                        className="form-control max-width"
                                        defaultValue={product?.length}
                                        type="text"
                                        {...register("length")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.length?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều dài sản phẩm</p>}

                                <p className="form-group">
                                    <label>Chiều rộng sản phẩm</label>
                                    <input
                                        name="width"
                                        className="form-control max-width"
                                        defaultValue={product?.width}
                                        type="text"
                                        {...register("width")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.width?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều rộng sản phẩm</p>}

                                <p className="form-group">
                                    <label>Chiều cao sản phẩm</label>
                                    <input
                                        name="height"
                                        className="form-control max-width"
                                        defaultValue={product?.height}
                                        type="text"
                                        {...register("height")}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </p>
                                {errors?.height?.type === "required" && <p className="valid-form__message">* Vui lòng nhập chiều cao sản phẩm</p>}

                                <p className="form-group">
                                    <label>Mô tả sản phẩm</label>
                                    <input
                                        name="highlights"
                                        className="form-control max-width"
                                        defaultValue={product?.description}
                                        type="text"
                                        {...register("highlights")}
                                        onChange={(e) => setProduct(e.target.value)}
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
                                    {listSpecification?.map((spec, index) => (
                                        <tbody key={index}>
                                            <tr key={index}>
                                                {/* <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={checked.includes(spec.specificationId)}
                                                    onChange={() => handleCheck(spec.specificationId)}
                                                />
                                            </div>
                                        </td> */}
                                                <td>{spec.specificationId}</td>
                                                <td>{spec.name}</td>
                                                <td>
                                                    <input
                                                        defaultValue={specifications[index]?.value}
                                                        {...register(`test.${spec.specificationId}.value`)}
                                                    // onChange={(e) => setProduct(e.target.value)}
                                                    />
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
                                        {/* <input
                                    ref={inputFile}
                                    id="file"
                                    type="file"
                                    onChange={(e) => onSelectFile(e)}
                                /> */}
                                        {images?.map((i, index) => (
                                            <span key={index}>
                                                <img
                                                    key={index}
                                                    src={i}
                                                    style={{ width: '50px', height: '50px', margin: '0 10px' }}
                                                    alt="img"
                                                />
                                                {/* <span onClick={() => deleteImage(index)}>&times;</span> */}
                                            </span>
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
                                    Cập nhật sản phẩm
                                </Button>
                            </form>
                        </div>
                    </Row>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sản phẩm cập nhật thành công!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                history.push('/list');
                            }}>
                                Trở về
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </> : <div>Vui lòng đăng nhập</div>}
        </Container>

    );
}

export default UpdateEmployee;