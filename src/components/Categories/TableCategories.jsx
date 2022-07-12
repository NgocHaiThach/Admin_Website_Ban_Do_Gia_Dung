import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deleteOneCategory, setListCatergory } from '../../reudx/Categories/apiFuntionCategory';


function TableCategories({ titleData, listCategory }) {

    const data = [...listCategory];
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [idCategory, setIdCategory] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handelDelete = (id) => {
        deleteOneCategory(dispatch, id);
        history.push('/categorise');
        handleClose()
    }

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
        titleData?.forEach((item, index) => {
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
                    setListCatergory(dispatch, data);
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
                    setListCatergory(dispatch, data);
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

    return (
        <div className="panel-body">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {titleData.map((title, index) => (
                            <th key={index}>
                                {title.field}
                                {/* {renderIconSort(title.sortable, index, title.name)} */}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((item, index) => (
                    <tbody key={index}>
                        <tr key={index}>
                            {/* {renderDataValues(employee)} */}
                            <td>{item.categoryId}</td>
                            <td>{item.classificationId}</td>
                            <td>{item.name}</td>
                            <td>{item.slogan}</td>
                            <td className="col-lg-3">
                                <Button variant="success" className="mr-5">
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`update-category/${(item.categoryId).toLowerCase()}`}>
                                        Cập nhật
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIdCategory(item.categoryId)
                                        handleShow()
                                    }}
                                    variant="danger" className="ml-5">
                                    Xóa
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirm</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Trở về
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handelDelete(idCategory)}
                                        >
                                            Xóa loại sản phẩm
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

export default TableCategories;