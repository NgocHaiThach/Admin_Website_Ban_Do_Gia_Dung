import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListClassification } from '../../reudx/Classification/apiFuntionClassification';
import { getListClassificationSuccess } from '../../reudx/Classification/listClassificationSlice';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableClassification from './TableClassification';
import cookies from 'react-cookies';


function HomeClassification(props) {

    const adminInfo = cookies.load('admin');

    const titleData = [
        // { name: 'id', field: "Id", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classification', field: "Danh Mục", sortable: 'none' },
        // { name: 'action', field: "Hoạt động", sortable: 'none' },
    ]

    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const typingTimoutRef = useRef(null);
    const dispatch = useDispatch();

    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi('/admin/classifications/all', 'GET')
        setListToSearch(res.data.result)
    }

    useEffect(() => {
        if (adminInfo) {
            getToSearch();
            getListClassification(dispatch);
        }
    }, []);


    const listClassification = useSelector(state => state.classification.list);

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
        dispatch(getListClassificationSuccess(filter));
        setInput(input);
    }



    return (
        <Container>
            {adminInfo ?
                <Row>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title mb-40 mt-4">Danh Sách Danh Mục</h3>
                        </div>

                        <form className='search-product mb-20' >
                            <input className='search__input'
                                placeholder='Loại sản phẩm bạn muốn tìm...'
                                value={search}
                                onChange={onSearch}
                                style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                            />
                        </form>

                        <div className="total-money mb-3">
                            Tổng danh mục: {listClassification.length}
                        </div>

                        <TableClassification
                            listClassification={listClassification}
                            titleData={titleData}
                        />
                    </div>
                </Row> : <div>Vui lòng đăng nhập</div>}
        </Container>
    );
}

export default HomeClassification;