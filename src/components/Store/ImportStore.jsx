import { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListEmployee } from '../../reudx/apiFuntion';
import { getListEmployeeSuccess } from '../../reudx/listEmployeeSlice';
import callApi from '../../utils/callApi';
import { FormatInput } from '../../utils/format';
import TableProduct from './TableProduct';
import cookies from 'react-cookies';


function ImportStore(props) {

    const adminInfo = cookies.load('admin');

    const titleData = [
        { name: 'id', field: "Chọn", sortable: 'none' },
        { name: 'id', field: "Mã", sortable: 'none' },
        { name: 'name', field: "Tên", sortable: 'none' },
        { name: 'quantity', field: "Nhập số lượng", sortable: 'none' },
        { name: 'category', field: "Loại", sortable: 'none' },
        { name: 'price', field: "Giá", sortable: 'none' },
        { name: 'modifyDate', field: "Ngày Tạo", sortable: 'none' },
    ]
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (adminInfo) {
            getListEmployee(dispatch);
            getToSearch();
        }
    }, []);

    const [listToSearch, setListToSearch] = useState([]);
    const [search, setSearch] = useState('');
    const typingTimoutRef = useRef(null);

    const listEmployee = useSelector(state => state.listEmployee.list);
    const [valueSelect, setValueSelect] = useState('none');
    const [quantity, setQuantity] = useState('none');

    //get api lưu vào ListToSearch để cho việc filter 
    const getToSearch = async () => {
        const res = await callApi('/admin/products/all', 'GET')
        setListToSearch(res.data.result)
    }

    const onSearch = (e) => {
        const input = e.target.value
        setSearch(input);

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
        const val = FormatInput(input.search);
        const filter = listToSearch.filter((item) => {
            const name = FormatInput(item.name)
            if (name.includes(val)) {
                return item
            }
        })
        dispatch(getListEmployeeSuccess(filter));
    }


    const onActions = async (data) => {
        if (valueSelect === "import") {
            if (data.length > 0) {
                await callApi("/storeds/import", "POST", {
                    storeId: id,
                    products: data
                });
                handleShow();
            }
            else {
                alert('Vui lòng chọn sản phẩm');
            }
        }
        else if (valueSelect === "export") {
            if (data.length > 0) {
                await callApi("/storeds/export", "POST", {
                    storeId: id,
                    products: data
                })
                    .then(res => {
                        if (res.status === 200) {
                            handleShow();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alert('Số lượng sản phẩm không đủ để thực hiện xuất hàng. Vui lòng kiểm tra lại')

                    })
            }
            else {
                alert('Vui lòng sản phẩm');
            }
        }
        else if (valueSelect === "none") {
            alert('Vui lòng chọn hành động thực hiện');
        }
    }

    return (
        <Container>
            {adminInfo ?
                <>
                    <Form className="mb-4">
                        <div>
                            <h3 className="mt-4 mb-4">Danh sách sản phẩm nhập hàng</h3>
                            {/* <a href="/me/trash/courses">Thùng rác ({{deletedCount}})</a> */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col-md-3 form-check" style={{ marginRight: '15px' }}>
                                    <input
                                        // onChange={() => setCheckAll(!checkAll)}
                                        // checked={checkAll}
                                        value={search}
                                        onChange={onSearch}
                                        style={{ width: '250px' }}
                                        className="col-md-3"
                                        placeholder="Sản phẩm muốn  tìm..."
                                        type="text"
                                    />
                                    {/* <label className="form-check-label"
                                htmlFor="checkbox-all">
                                Chọn tất cả
                            </label> */}
                                </div>
                                <div className="d-flex col-md-8 justify-content-end">
                                    <select onChange={e => setValueSelect(e.target.value)} className="col-md-3" name="action" required>
                                        <option style={{ textAlign: 'center' }} value="none">-- Chọn hành động --</option>
                                        <option style={{ textAlign: 'center' }} value="import">Nhập hàng</option>
                                        <option style={{ textAlign: 'center' }} value="export">Xuất hàng</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <TableProduct
                        titleData={titleData}
                        listEmployee={listEmployee}
                        onActions={onActions}
                        quantity={quantity}
                    />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{valueSelect === "import" ? "Thực hiện nhập hàng thành công" : "Thực hiện xuất hàng thành công"}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                handleClose()
                            }}>
                                Trở về
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                : <div>Vui lòng đăng nhập</div>}
        </Container>
    );
}

export default ImportStore;