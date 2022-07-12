import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableInfoStore from './TableInfoStore';
import cookies from 'react-cookies';

function InfoStore(props) {

    const adminInfo = cookies.load('admin');

    const titleData = [
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên Sản Phẩm", sortable: 'none' },
        { name: 'quantity', field: "Số Lượng", sortable: 'none' },
    ]
    const { id } = useParams();
    const [listInfo, setListInfo] = useState([]);
    const [name, setName] = useState('');

    const getInfoStoreById = async () => {
        const res = await callApi("/storeds/get", "POST", {
            storeId: id
        })
        setListInfo(res.data.result.products);
        setName(res.data.result.name)
    }

    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const typingTimoutRef = useRef(null);

    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi("/storeds/get", 'POST', {
            storeId: id
        })
        setListToSearch(res.data.result.products);

    }
    const onSearch = (e) => {
        const input = e.target.value
        setSearch(input);

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
        const val = FormatInput(input.search);
        const filter = listToSearch.filter((item) => {
            const name = FormatInput(item.name)
            if (name.includes(val)) {
                return item
            }
        })
        setListInfo(filter)
    }

    useEffect(() => {
        if (adminInfo) {
            getInfoStoreById();
            getToSearch();
        }
    }, []);

    return (
        listInfo && <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-40 mt-4">Danh sách sản phẩm cửa hàng {name}</h3>
                    </div>

                    <form className='search-product mb-20' >
                        <input className='search__input'
                            placeholder='Sản phẩm bạn muốn tìm bạn muốn tìm...'
                            value={search}
                            onChange={onSearch}
                            style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                        />
                    </form>

                    <div className="total-money mb-3" style={{ fontSize: '20px' }}>
                        Tổng sản phẩm: {listInfo.length}
                    </div>

                    <TableInfoStore
                        listInfo={listInfo}
                        titleData={titleData}
                    />
                </div>
            </Row>
        </Container>
    );
}

export default InfoStore;