import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStore } from '../../reudx/Store/apiFunctionStore';
import TableStore from './TableStore';

function HomeStore(props) {
    const titleData = [
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classification', field: "Danh Mục", sortable: 'none' },
        { name: 'address', field: "Địa Chỉ", sortable: 'none' },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        getStore(dispatch);
    }, [])

    const store = useSelector(state => state.store.list);

    return (
        <Container>
            <Row>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title mb-40">Danh Sách Danh Mục</h3>
                    </div>

                    <div className="total-money">
                        Tổng sản phẩm: 10
                    </div>

                    <TableStore
                        store={store}
                        titleData={titleData}
                    />
                </div>
            </Row>
        </Container>
    );
}

export default HomeStore;