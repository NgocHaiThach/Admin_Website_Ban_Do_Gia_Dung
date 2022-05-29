import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deleteOneClassification } from '../../reudx/Classification/apiFuntionClassification';

function TableClassification({ titleData, listClassification }) {
    const data = [...listClassification];
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [idClassfication, setIdClassification] = useState('');


    const handelDelete = (id) => {
        deleteOneClassification(dispatch, id);
        handleClose();
        history.push('/classification');
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
                            <td>{item.classificationId}</td>
                            <td>{item.name}</td>
                            <td className="col-lg-3">
                                <Button variant="success" className="mr-5">
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`update-classification/${(item.classificationId).toLowerCase()}`}>
                                        Cập nhật
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIdClassification((item.classificationId).toLowerCase())
                                        handleShow()
                                    }}
                                    variant="danger" className="ml-5">
                                    Xóa
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thông báo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Trở về
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handelDelete(idClassfication)}
                                        >
                                            Xoá danh mục
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

export default TableClassification;