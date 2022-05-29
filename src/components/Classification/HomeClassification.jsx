import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListClassification } from '../../reudx/Classification/apiFuntionClassification';
import TableClassification from './TableClassification';

function HomeClassification(props) {

    const titleData = [
        // { name: 'id', field: "Id", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'classification', field: "Danh Mục", sortable: 'none' },
        // { name: 'action', field: "Hoạt động", sortable: 'none' },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        getListClassification(dispatch);
    }, [])

    const listClassification = useSelector(state => state.classification.list);
    console.log(listClassification)


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

                    <TableClassification
                        listClassification={listClassification}
                        titleData={titleData}
                    />
                </div>
            </Row>
        </Container>
    );
}

export default HomeClassification;