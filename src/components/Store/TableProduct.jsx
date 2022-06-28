import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { formatDate, formatPrice } from '../../utils/format';
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

function TableProduct({ listEmployee, titleData, onActions, quantity }) {

    // const data = [...listEmployee];
    const data2 = [...listEmployee];

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



    let listObjId = [];

    for (let i = 0; i < checked.length; i++) {
        listObjId.push({ productId: checked[i], quantity: quantity })
    }
    listObjId.sort((a, b) => {
        if (a.productId < b.productId) { return -1; }
        if (a.productId > b.productId) { return 1; }
        return 0;
    })

    // console.log(listObjId)

    const handleActions = () => {
        // onActions(listObjId);
        // handleSubmit(data => console.log(data))
    }
    console.log("list", listObjId)

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log("test", data.test);
        // data.test.map(item => console.log("as", item.firstName));
        const b = []
        // const values = (Object.values(data.test));
        // const keys = (Object.keys(data.test));
        // console.log("keys", keys)
        // console.log("values", values)
        // const keyOfValue = (Object.keys(values));
        for (const property in data.test) {
            // console.log(`${property}: ${data.test[property].quantity}`);
            if (data.test[property].quantity !== "") {
                b.push({ id: property, quantity: data.test[property].quantity });
            }
        }

        console.log("b", b)
        // values.map((item, index) => {
        //     if (item.quantity !== '') {
        //         // console.log("item", index, item.firstName);
        //         b.push({ key: index, value: item.quantity });
        //     }
        // })


        for (let i = 0; i < listObjId.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (listObjId[i].productId === b[j].id) {
                    // if (listObjId[i].productId === b[j].key) {
                    listObjId[i].quantity = +b[j].quantity;
                    // }
                }
            }
        }

        listObjId = listObjId.filter((item) => item.quantity !== 'none')
        console.log('done', listObjId);

    }

    return (
        <div className="panel-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" />
                <Button
                    variant="primary"
                    // type="submit"
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
                    {data2.map((employee, index) => (
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
                                <td>
                                    <input {...register(`test.${employee.productId}.quantity`)} />
                                    {/* <Controller
                                        render={({ field }) => <input {...field} />}
                                        name={`test.${employee.productId}.lastName`}
                                        control={control}
                                    /> */}
                                </td>
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
            </form>
        </div>
    );
}

export default TableProduct;