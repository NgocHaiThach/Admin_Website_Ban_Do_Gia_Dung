import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListSpecification } from '../../reudx/Specification/apiSpecification';
import { getListSpecificationSuccess } from '../../reudx/Specification/listSpecification';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableSpecification from './TableSpecification';

function HomeSpecification(props) {
    const titleData = [
        // { name: 'id', field: "Id", sortable: 'none' },
        { name: 'specificationId', field: "Id", sortable: 'none' },
        { name: 'name', field: "Tên Thông Số", sortable: 'none' },
    ]
    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const typingTimoutRef = useRef(null);
    const dispatch = useDispatch();

    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi('/admin/specifications', 'GET')
        setListToSearch(res.data.result)
    }

    useEffect(() => {
        getListSpecification(dispatch);
        getToSearch();
    }, []);

    const listSpecification = useSelector(state => state.specification.list);


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
        })
        dispatch(getListSpecificationSuccess(filter));
        setInput(input)
    }




    return (
        <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-40 mt-4">Danh Sách Thông Số</h3>
                    </div>


                    <form className='search-product mb-20' >
                        <input className='search__input'
                            placeholder='Thông số bạn muốn tìm bạn muốn tìm...'
                            value={search}
                            onChange={onSearch}
                            style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                        />
                    </form>

                    <div className="total-money mb-3" style={{ fontSize: '20px' }}>
                        Tổng thông số: {listSpecification.length}
                    </div>

                    <TableSpecification
                        listSpecification={listSpecification}
                        titleData={titleData}
                    />
                </div>
            </Row>
        </Container>
    );
}

export default HomeSpecification;