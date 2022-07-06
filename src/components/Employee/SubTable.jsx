import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useFieldArray, useForm } from "react-hook-form";


function SubTable({ listSpecification, titleData, onActions, quantity }) {
    const data2 = [...listSpecification];

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
        listObjId.push({ specificationId: checked[i], value: quantity })
    }
    listObjId.sort((a, b) => {
        if (a.specificationId < b.specificationId) { return -1; }
        if (a.specificationId > b.specificationId) { return 1; }
        return 0;
    });

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        const b = []

        for (const property in data.test) {
            if (data.test[property].value !== "") {
                b.push({ id: property, value: data.test[property].value });
            }
        }

        for (let i = 0; i < listObjId.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (listObjId[i].specificationId === b[j].id) {
                    // if (listObjId[i].productId === b[j].key) {
                    listObjId[i].value = b[j].value;
                    // }
                }
            }
        }

        listObjId = listObjId.filter((item) => item.value !== 'none' && item.value !== undefined);
        console.log('list donee', listObjId)
        // onActions(listObjId);
    }


    return (
        <div className="panel-body mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="submit" /> */}
                <Button
                    variant="primary"
                    type="submit"
                    className="col-md-2 mt-3 mb-3"
                    style={{ marginLeft: '15px' }}
                // onClick={handleActions}
                >
                    Xác nhận
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
                    {data2.map((spec, index) => (
                        <tbody key={index}>
                            <tr key={index}>
                                <td>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={checked.includes(spec.specificationId)}
                                            onChange={() => handleCheck(spec.specificationId)}
                                        />
                                    </div>
                                </td>
                                <td>{spec.specificationId}</td>
                                <td>{spec.name}</td>
                                <td>
                                    <input {...register(`test.${spec.specificationId}.value`)} />
                                    {/* <Controller
                                        render={({ field }) => <input {...field} />}
                                        name={`test.${employee.productId}.lastName`}
                                        control={control}
                                    /> */}
                                </td>
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

export default SubTable;