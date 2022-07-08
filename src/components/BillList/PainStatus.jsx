import React, { useRef } from 'react';
import { useState } from 'react';
import callApi from '../../utils/callApi';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { FormatInput, formatPrice } from '../../utils/format';



function PainStatus(props) {
    const titleData = [
        { name: 'orderId', field: "Mã", sortable: 'none' },
        { name: 'products', field: "Sản phẩm", sortable: 'none' },
        { name: 'status', field: "Trạng thái", sortable: 'none' },
        { name: 'total', field: "Tổng giá", sortable: 'none' },
        { name: 'orderDate', field: "Ngày", sortable: 'none' },
        { name: 'activity', field: "Hoạt động", sortable: 'none' },
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [listBill, setListBill] = useState([]);

    const [sizePage, setSizePage] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getBillListAll = async () => {
        setIsLoading(true);
        const res = await callApi("/orders/get", "POST", {
            customerId: "2a0a27c3-2290-4806-7203-08da3b719d82",
            status: "PAIN",
            page: currentPage,
            size: sizePage,
        })
        // console.log("bill list", res.data.result.orders);
        setListBill(res.data.result.orders);
        setListToSearch(res.data.result.orders);
        setIsLoading(false);
        setTotalPage(res.data.result.totalPage);
    }
    useEffect(() => {
        getBillListAll();
    }, [currentPage, sizePage]);

    const handleChange = (e) => {
        const field = e.target.value;
        console.log("field", field);
        setSizePage(field);
    };

    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const typingTimoutRef = useRef(null);

    const onSearch = (e) => {
        const input = e.target.value
        setSearch(input)

        if (typingTimoutRef.current) {
            clearTimeout(typingTimoutRef.current)
        }

        typingTimoutRef.current = setTimeout(() => {
            const formvalues = {
                search: input,
            }
            if (handleSearch) {
                handleSearch(formvalues)
            }
        }, 300)

    }

    //xu ly search product
    const handleSearch = (input) => {
        const val = FormatInput(input.search)

        let filter = [];
        for (let i = 0; i < listToSearch.length; i++) {
            if (listToSearch[i].products.find(i => FormatInput(i.name).includes(val))) {
                filter.push(listToSearch[i])
            }
        }
        setListBill(filter);
        setInput(input)
    }

    return (
        listBill.length > 0 ?
            <div>
                <div className="d-flex mb-5">
                    <Pagination className="mr-4">
                        <Pagination.First disabled={currentPage === 0} onClick={() => setCurrentPage(0)} />
                        <Pagination.Prev disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} />

                        <Pagination.Item active={currentPage === 0} onClick={() => {
                            setCurrentPage(0);
                        }}>
                            {1}
                        </Pagination.Item>

                        {currentPage > 1 ? (
                            <>
                                <Pagination.Ellipsis />
                            </>
                        ) : null}

                        {currentPage < totalPage - 2 && currentPage > 0 ?
                            <Pagination.Item active={currentPage} >
                                {currentPage + 1}
                            </Pagination.Item>
                            : null
                        }

                        {totalPage - 1 > currentPage + 1 ? <Pagination.Ellipsis /> : null}

                        {currentPage < totalPage && currentPage === totalPage - 2 && currentPage > 0 ?
                            <Pagination.Item active={currentPage} >
                                {currentPage + 1}
                            </Pagination.Item>
                            : null
                        }

                        {totalPage > 1 ? <Pagination.Item active={currentPage === totalPage - 1} onClick={() => {
                            setCurrentPage(totalPage - 1);
                        }}>  {totalPage}</Pagination.Item> : null}

                        <Pagination.Next disabled={currentPage === totalPage - 1} onClick={() => setCurrentPage(currentPage + 1)} />
                        <Pagination.Last disabled={currentPage === totalPage - 1} onClick={() => setCurrentPage(totalPage - 1)} />
                    </Pagination>

                    <Form.Select onChange={handleChange}
                        style={{ height: '40px', width: '100px', marginLeft: '15px' }}
                        className="ml-4" aria-label="Default select example">
                        <option>Size</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </Form.Select>

                </div>

                <form className='search-product mb-20'>
                    <input className='search__input'
                        placeholder='Tìm kiếm...'
                        value={search}
                        onChange={onSearch}
                    />
                </form>

                {isLoading ?
                    <div className="bill__loading">
                        <div className="spinner-container">
                            <div className="loading-spinner">
                            </div>
                        </div>
                    </div> :
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
                        {listBill.map((item, index) => (
                            <tbody key={index}>
                                <tr key={index}>

                                    <td>{item.orderId.slice(0, 8)}</td>
                                    <td>
                                        {item.products.map((p, i) => (
                                            <li key={i}>
                                                {p.name}
                                            </li>
                                        ))}
                                    </td>
                                    <td>{item.status}</td>
                                    <td>{formatPrice(item.total)}đ</td>
                                    <td>{item.orderDate}</td>
                                    <td className="col-lg-3">
                                        <Button variant="success">
                                            Cập nhật
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
                }
            </div>
            : <h3>Đơn hàng trống</h3>
    );
}

export default PainStatus;