import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListEmployee } from '../../reudx/apiFuntion';
import TableEmployee from './TableEmployee';

function HomePage(props) {
    const titleData = [
        // { name: 'id', field: "Chọn", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên", sortable: 'none' },
        { name: 'category', field: "Loại", sortable: 'none' },
        { name: 'price', field: "Giá", sortable: 'none' },
        { name: 'quantity', field: "Số lượng", sortable: 'none' },
        { name: 'modifyDate', field: "Ngày tạo", sortable: 'none' },
        { name: 'actions', field: "Hoạt động", sortable: 'none' },
    ]
    const [currentPage, setCurrentPage] = useState(0);
    const [sizePage, setSizePage] = useState(10);
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        getListEmployee(dispatch);
    }, [])

    // const totalElements = useSelector(state => state.totalElements.total)
    // const totalPage = Math.ceil(totalElements / sizePage);

    const listEmployee = useSelector(state => state.listEmployee.list);

    const handleChange = (e) => {
        const size = e.target.value;
        setSizePage(size);
    }

    const handleSearch = (formValue) => {
        setSearchText(formValue.searchTerm);
    }

    return (
        <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-4 mt-4">Danh Sách Sản Phẩm</h3>
                    </div>

                    <div className="total-money">
                        Tổng sản phẩm: ...
                    </div>

                    <div className="form-action">
                        {/* <ErrorBoundary> */}
                        {/* <SearchForm onSubmit={handleSearch} /> */}
                        {/* <Form.Select
                            onChange={handleChange}
                            className="col-lg-12 select-size-page"
                            aria-label="Default select example">
                            <option>Chọn kích thước trang</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </Form.Select> */}
                        {/* </ErrorBoundary> */}
                    </div>
                    {/* <ErrorBoundary> */}
                    <TableEmployee listEmployee={listEmployee} titleData={titleData} />
                    {/* <PaginationData currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sizePage={sizePage}
                        totalPage={totalPage}
                    /> */}
                    {/* </ErrorBoundary> */}
                </div>
            </Row>
        </Container>


    );
}

export default HomePage;