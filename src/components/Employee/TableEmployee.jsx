import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOneEmployee, getListEmployee, getSortEmployee, setListEmployee, updateOneProduct } from '../../reudx/apiFuntion';
import { useHistory } from 'react-router-dom';
import { formatDate, formatPrice } from '../../utils/format';
import callApi from '../../utils/callApi';

function TableEmployee({ listEmployee, titleData }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [idProduct, setIdProduct] = useState('');

    const [titleTable, setTitleTable] = useState([...titleData]);
    const data = [...listEmployee];


    const renderIconSort = (status, id, name) => {
        if (status === "none") {
            return (
                <i className="fa-solid fa-arrow-down-wide-short"
                    onClick={() => changeSortStatus(id, name)}
                    style={{ marginLeft: '15px' }}>
                </i>
            );
        }
        else if (status === 'desc') {
            return (
                <i className="fa-solid fa-arrow-down-wide-short"
                    onClick={() => changeSortStatus(id, name)}
                    style={{ marginLeft: '15px' }}></i>
            )
        }
        else if (status === "asc") {
            return (
                <i className="fa-solid fa-arrow-down-wide-short"
                    onClick={() => changeSortStatus(id, name)}
                    style={{ marginLeft: '15px' }}>
                </i>
            );
        }
    }

    const changeSortStatus = (id, field) => {
        titleTable?.forEach((item, index) => {
            if (index === id) {
                if (item.sortable === 'none' || item.sortable === 'desc') {
                    item.sortable = 'asc';
                    data.sort((a, b) => {
                        if (typeof a[field] === 'number') {

                            return a[field] - b[field];
                        }
                        else if (typeof a[field] === 'string') {
                            return a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1;
                        }

                    })
                    setListEmployee(dispatch, data);
                }
                else if (item.sortable === 'asc') {
                    item.sortable = 'desc';
                    data.sort((a, b) => {
                        if (typeof a[field] === 'number') {
                            return b[field] - a[field];
                        }
                        else if (typeof a[field] === 'string') {
                            return b[field].toLowerCase() > a[field].toLowerCase() ? 1 : -1;
                        }
                    })
                    setListEmployee(dispatch, data);
                }
                // else if (item.sortable === 'desc') {
                //     item.sortable = 'none';
                //     setListEmployee(dispatch, data);
                // }
            }
            else {
                item.sortable = 'none';
            }
        })
    }

    const handelDelete = (id) => {
        deleteOneEmployee(dispatch, id);
        history.push('/list');
        handleClose();
    };

    const [product, setProduct] = useState(null)
    const handelEnable = () => {
        console.log(product)
        const enable = false;
        updateOneProduct(dispatch, product.avatar, product.categoryId, product.height, product.highlights, product.productId, product.length, product.name, product.price, product.weight, product.width, product.specifications, product.images, enable)
        handleClose1();
    }

    return (
        <div className="panel-body">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {titleData.map((title, index) => (
                            <th key={index}>
                                {title.field}
                                {renderIconSort(title.sortable, index, title.name)}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((employee, index) => (
                    <tbody key={index}>
                        <tr key={index}>
                            {/* {renderDataValues(employee)} */}
                            {/* <td>  <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                            </div></td> */}
                            <td>{employee.productId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.categoryId}</td>
                            <td>{formatPrice(employee.price)}đ</td>
                            <td>{formatDate(employee.modifyDate)}</td>
                            <td className="col-lg-3">
                                <Button variant="success" className="mr-5">
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`update/${employee.productId}`}>
                                        Cập nhật
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIdProduct(employee.productId)
                                        handleShow()
                                    }}
                                    variant="danger" className="ml-5"
                                >
                                    Xóa
                                </Button>
                                {employee.enable ? <Button
                                    onClick={() => {
                                        setProduct(employee)
                                        handleShow1()
                                    }}
                                    variant="warning" className="ml-5"
                                >
                                    Khóa
                                </Button> :
                                    null}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thông báo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Trở về
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handelDelete(idProduct)}
                                        >
                                            Xóa sản phẩm
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thông báo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Bạn có chắc chắn muốn khóa sản phẩm này?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose1}>
                                            Trở về
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handelEnable(product)}
                                        >
                                            Khóa sản phẩm
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
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

        </div>
    );
}

export default TableEmployee;