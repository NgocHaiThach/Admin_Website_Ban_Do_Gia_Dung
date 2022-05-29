import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../reudx/Categories/apiFuntionCategory';
import TableCategories from './TableCategories';

function HomeCategories(props) {
    const titleData = [
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classificationId', field: "Mã danh mục", sortable: 'none' },
        { name: 'categories', field: "Loại", sortable: 'none' },
        { name: 'slogan', field: "Slogan", sortable: 'none' },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        getListCategory(dispatch);
    }, [])

    const listCategory = useSelector(state => state.category.list);
    console.log(listCategory)

    return (
        <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-40">Danh Sách Loại Sản Phẩm</h3>
                    </div>

                    <div className="total-money">
                        Tổng số: 10
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