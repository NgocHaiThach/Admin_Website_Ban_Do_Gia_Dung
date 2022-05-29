import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListSpecification } from '../../reudx/Specification/apiSpecification';
import TableSpecification from './TableSpecification';

function HomeSpecification(props) {
    const titleData = [
        // { name: 'id', field: "Id", sortable: 'none' },
        { name: 'specificationId', field: "Id", sortable: 'none' },
        { name: 'name', field: "Tên Thông Số", sortable: 'none' },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        getListSpecification(dispatch);
    }, [])

    const listSpecification = useSelector(state => state.specification.list);
    console.log(listSpecification)


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