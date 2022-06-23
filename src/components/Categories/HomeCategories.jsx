import React, { useEffect, useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';
import { getListCategorySuccess } from '../../reudx/Categories/listCategorySlice';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableCategories from './TableCategories';

function HomeCategories(props) {
    const titleData = [
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classificationId', field: "Mã danh mục", sortable: 'none' },
        { name: 'categories', field: "Loại", sortable: 'none' },
        { name: 'slogan', field: "Slogan", sortable: 'none' },
    ]
    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const typingTimoutRef = useRef(null);
    const dispatch = useDispatch();

    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi('/admin/categories/all', 'GET')
        setListToSearch(res.data.result)
    }

    useEffect(() => {
        getListCategory(dispatch);
        getToSearch();
    }, [])

    const listCategory = useSelector(state => state.category.list);



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
            const name = FormatInput(item.categoryId)
            if (name.includes(val)) {
                return item
            }
        })
        dispatch(getListCategorySuccess(filter));
        setInput(input)
    }


    return (
        <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-40 mt-4">Danh Sách Loại Sản Phẩm</h3>
                    </div>

                    <form className='search-product mb-20' >
                        <input className='search__input'
                            placeholder='Loại sản phẩm bạn muốn tìm...'
                            value={search}
                            onChange={onSearch}
                            style={{ fontSize: '18px', width: '350px', padding: '10px' }}
                        />
                    </form>

                    <div className="total-money mb-3" style={{ fontSize: '20px' }}>
                        Tổng số: {listCategory.length}
                    </div>

                    <TableCategories
                        listCategory={listCategory}
                        titleData={titleData}
                    />
                </div>
            </Row>
        </Container>
    );
}

export default HomeCategories;