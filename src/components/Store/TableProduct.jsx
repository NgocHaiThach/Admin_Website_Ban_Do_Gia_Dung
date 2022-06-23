import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { formatDate, formatPrice } from '../../utils/format';

function TableProduct({ listEmployee, titleData, onActions, quantity }) {

    const data = [...listEmployee];

    const [checked, setChecked] = useState([]);


    const handleCheck = (id) => {

        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked) {

                return checked.filter(item => item !== id)
            }
            else {
                return [...prev, id,]
            }
        })
    }



    const listObjId = [];

    for (let i = 0; i < checked.length; i++) {
        listObjId.push({ productId: checked[i], quantity: quantity })
    }

    const handleActions = () => {
        onActions(listObjId);
    }
    console.log("list", listObjId)


    return (
        <div className="panel-body">
            <Button
                variant="primary"
                //  type="submit" 
                className="col-md-2 mt-3 mb-3"
                style={{ marginLeft: '15px' }}
                onClick={handleActions}
            >
                Submit
            </Button>
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
                {data.map((employee, index) => (
                    <tbody key={index}>
                        <tr key={index}>
                            <td>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={checked.includes(employee.productId)}
                                        onChange={() => handleCheck(employee.productId)}
                                    />
                                </div>
                            </td>
                            <td>{employee.productId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.categoryId}</td>
                            <td>{formatPrice(employee.price)}đ</td>
                            <td>{formatDate(employee.modifyDate)}</td>
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

export default TableProduct;