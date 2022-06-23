import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deleteOneSpecification } from '../../reudx/Specification/apiSpecification';

function TableInfoStore({ titleData, listInfo }) {
    const data = [...listInfo];

    return (
        <div className="panel-body">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {titleData.map((title, index) => (
                            <th key={index}>
                                {title.field}

                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((item, index) => (
                    <tbody key={index}>
                        <tr key={index}>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    </tbody>
                ))}
                <tfoot>
                    <tr>
                        {titleData.map((title, index) => (
                            <th key={index}>{title.field}</th>
                        ))}
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default TableInfoStore;