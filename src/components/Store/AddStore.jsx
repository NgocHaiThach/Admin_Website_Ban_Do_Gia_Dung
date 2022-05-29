import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { addStore } from '../../reudx/Store/apiFunctionStore';
import InputField from '../InputField';
import SelectField2 from '../SelectField2';

function AddStore(props) {

    //validate role
    const validate = Yup.object({
        name: Yup.string()
            .max(50, "Tên phải ngắn hơn 50 ký tự")
            .required("Trường này bắt buộc"),
        province: Yup.string()
            .required("Trường này bắt buộc"),
        district: Yup.string()
            .required("Trường này bắt buộc"),
        ward: Yup.string()
            .required("Trường này bắt buộc"),
        detail: Yup.string()
            .required("Trường này bắt buộc"),
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const [listProv, setListProv] = useState(null);


    //get list provinces
    const getApiProvinces = async () => {
        const res = await axios.get('https://provinces.open-api.vn/api/?depth=3');
        setListProv(res.data);
    }

    useEffect(() => {
        getApiProvinces();
    }, []);

    //rerender 
    const [reRender, setReRender] = useState();
    useEffect(() => { }, [reRender]);

    //save local province choosed
    const getLocalStorage = () => {
        let province = localStorage.getItem('province')
        if (province) {
            return JSON.parse(localStorage.getItem('province'))
        } else {
            return undefined
        }
    };

    // define list provinces
    let PROVINCES_OPTIONS = [];

    //loop push name
    for (const key in listProv) {
        PROVINCES_OPTIONS.push(listProv[key].name);
    }

    // loop define object
    PROVINCES_OPTIONS = PROVINCES_OPTIONS.map((item, i) => {
        return {
            value: i,
            label: item
        }
    })

    //save local district choosed
    const getDistrictLocalStorage = () => {
        let district = localStorage.getItem('district')
        if (district) {
            return JSON.parse(localStorage.getItem('district'))
        } else {
            return undefined
        }
    };

    //define list object districts
    let districtInCity = [];

    //find name district in list provinces and districs to array
    for (const key in listProv) {
        if (listProv[key].name === getLocalStorage()?.label) {
            for (const t in listProv[key].districts) {
                districtInCity.push(listProv[key].districts[t]);
            }
        }
    }

    //define list name
    let DISTRICTS_OPTIONS = [];


    //loop in array object and push district name
    for (const key in districtInCity) {
        DISTRICTS_OPTIONS.push(districtInCity[key].name);
    }

    //loop define save objetc name
    DISTRICTS_OPTIONS = DISTRICTS_OPTIONS.map((item, i) => {
        return {
            value: i,
            label: item
        }
    });

    //define list object wards
    let wardInDistrict = [];

    //loop in districts object to push list ward
    for (const key in districtInCity) {
        if (districtInCity[key].name === getDistrictLocalStorage()?.label) {
            for (const t in districtInCity[key].wards) {
                wardInDistrict.push(districtInCity[key].wards[t]);
            }
        }

    }

    //loop ward to object
    wardInDistrict = wardInDistrict.map((item, i) => {
        return {
            value: i,
            label: item.name
        }
    });

    return (
        <Container>
            <div className="mt-4 mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Thêm Cửa Hàng
            </div>
            <Row>
                <Formik
                    initialValues={
                        {
                            name: "",
                            province: "",
                            district: "",
                            ward: "",
                            detail: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={(values) => {
                        const {
                            name,
                            province,
                            district,
                            ward,
                            detail,
                        } = values;
                        console.log(
                            name,
                            province,
                            district,
                            ward,
                            detail,
                        )
                        addStore(dispatch, name, province, district, ward, detail)
                        handleShow()
                    }}
                >
                    {(formik) => (
                        <Form>
                            <InputField label="Tên" name="name" type="text" />
                            <Row>
                                <Col className="mr-10" md={4}>
                                    <SelectField2
                                        setReRender={setReRender}
                                        getLocalStorage={getLocalStorage}
                                        label="Tỉnh/Thành Phố"
                                        name="province"
                                        type="option"
                                        options={PROVINCES_OPTIONS} />
                                </Col>

                                <Col className="mr-10" md={4}>
                                    <SelectField2
                                        setReRender={setReRender}
                                        getDistrictLocalStorage={getDistrictLocalStorage}
                                        label="Quận/Huyện"
                                        name="district"
                                        type="option"
                                        options={DISTRICTS_OPTIONS} />
                                </Col>
                                <Col className="mr-10" md={4}>
                                    <SelectField2
                                        label="Xã/Phường"
                                        name="ward"
                                        type="option"
                                        options={wardInDistrict} />
                                </Col>
                            </Row>
                            <InputField label="Số nhà/Đường" name="detail" type="text" />
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

export default AddStore;