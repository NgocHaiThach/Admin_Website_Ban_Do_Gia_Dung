import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStore } from '../../reudx/Store/apiFunctionStore';
import { getStoreSuccess } from '../../reudx/Store/storeSlice';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableStore from './TableStore';
import cookies from 'react-cookies';


function HomeStore(props) {

    const adminInfo = cookies.load('admin');

    const titleData = [
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classification', field: "Tên", sortable: 'none' },
        { name: 'address', field: "Địa Chỉ", sortable: 'none' },
        { name: 'action', field: "Hoạt Động", sortable: 'none' },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        if (adminInfo) {
            getStore(dispatch);
            getToSearch();
        }
    }, [])

    const store = useSelector(state => state.store.list);


    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const typingTimoutRef = useRef(null);


    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi('/stores', 'GET')
        setListToSearch(res.data.result)
    }
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
        dispatch(getStoreSuccess(filter));
        setInput(input);
    }

    return (
        <Container>
            {adminInfo ?
                <Row>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title mb-4 mt-4">Danh Sách Cửa Hàng</h3>
                        </div>

                        <form className='search-product mb-20' >
                            <input className='search__input'
                                placeholder='Loại sản phẩm bạn muốn tìm...'
                                value={search}
                                onChange={onSearch}
                                style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                            />
                        </form>

                        <div className="total-money mb-4" style={{ fontSize: "18px" }}>
                            Tổng cửa hàng: {store.length}
                        </div>

                        <TableStore
                            store={store}
                            titleData={titleData}
                        />
                    </div>
                </Row>
                : <div>Vui lòng đăng nhập</div>}
        </Container>
    );
}

export default HomeStore;