import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListEmployee } from '../../reudx/apiFuntion';
import { getListEmployeeSuccess } from '../../reudx/listEmployeeSlice';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableEmployee from './TableEmployee';
import cookies from 'react-cookies';


function HomePage(props) {

    const adminInfo = cookies.load('admin');

    const titleData = [
        // { name: 'id', field: "Chọn", sortable: 'none' },
        { name: 'productId', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên", sortable: 'none' },
        { name: 'categoryId', field: "Loại", sortable: 'none' },
        { name: 'price', field: "Giá", sortable: 'none' },
        { name: 'modifyDate', field: "Ngày sửa", sortable: 'none' },
        { name: 'actions', field: "Hoạt động", },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        if (adminInfo) {
            getListEmployee(dispatch);
            getToSearch();
        }
    }, [])

    const getToSearch = async () => {
        const res = await callApi('/admin/products/all', 'GET')
        setListToSearch(res.data.result)
    }

    const listEmployee = useSelector(state => state.listEmployee.list);

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
        const filter = listToSearch.filter((item) => {
            const name = FormatInput(item.name)
            if (name.includes(val)) {
                return item
            }
        });
        dispatch(getListEmployeeSuccess(filter));
        setInput(input);
    }


    return (
        <Container>
            {adminInfo ?
                <Row>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title mb-4 mt-4">Danh Sách Sản Phẩm</h3>
                        </div>

                        <form className='search-product mb-20' >
                            <input className='search__input'
                                placeholder='Tên sản phẩm bạn muốn tìm...'
                                value={search}
                                onChange={onSearch}
                                style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                            />
                        </form>

                        <div className="total-money mb-4">
                            Tổng sản phẩm: {listEmployee.length}
                        </div>

                        <div className="form-action">

                        </div>
                        <TableEmployee listEmployee={listEmployee} titleData={titleData} />
                    </div>
                </Row>
                : <div>Vui lòng đăng nhập</div>}
        </Container>


    );
}

export default HomePage;