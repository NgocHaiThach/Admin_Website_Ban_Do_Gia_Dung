
import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteOneStore } from '../../reudx/Store/apiFunctionStore';

function TableStore({ store, titleData }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [idStore, setIdStore] = useState('');

    const data = [...store];

    const handelDelete = (id) => {
        deleteOneStore(dispatch, id);
        handleClose();
        history.push('/stores');
    }
    console.log(data)

    return (
        <div className="panel-body">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {titleData.map((title, index) => (
                            <th key={index}>
                                {title.field}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((item, index) => (
                    <tbody key={index}>
                        <tr key={index}>
                            <td>{item.storeId}</td>
                            <td>{item.name}</td>
                            <td>{item.fullAddress}</td>
                            <td className="col-lg-3">
                                <Button variant="success" className="mr-5">
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`update-store/${item.storeId}`}>
                                        Cập nhật
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIdStore(item.storeId)
                                        handleShow()
                                    }}
                                    variant="danger" className="ml-5"
                                >
                                    Xóa
                                </Button>
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
                                            onClick={() => handelDelete(idStore)}
                                        >
                                            Xóa sản phẩm
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

export default TableStore;