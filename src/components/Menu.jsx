import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import cookies from 'react-cookies';


function Menu(props) {

    const adminInfo = cookies.load('admin');
    const history = useHistory()

    const handleLogout = () => {
        cookies.remove('admin');
        history.push('/login');
    }

    return (

        <Navbar bg="light" expand="lg">
            <Container>
                {adminInfo ?
                    <>
                        <Navbar.Brand >
                            <Link className="menu__link" to="/list">
                                Ottel Gia Dụng
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="Quản Lý" id="basic-nav-dropdown">
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/list">
                                            Q.Lý Sản Phẩm
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/classification">
                                            Q.Lý Danh Mục
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/categorise">
                                            Q.Lý Loại
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/specification">
                                            Q.Lý Thông Số
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/stores">
                                            Q.Lý Cửa hàng
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Thêm" id="basic-nav-dropdown">
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/add">
                                            Thêm Sản Phẩm
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/add-classification">
                                            Thêm Danh Mục
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/add-categories">
                                            Thêm Loại
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/add-specification">
                                            Thêm Thông Số
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{ margin: '0', padding: '0' }}>
                                        <Link className="menu__link" to="/add-store">
                                            Thêm Cửa Hàng
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                {/* <Nav.Item> */}
                                <Link className="menu__link" to="/bills">
                                    Quản lý đơn hàng
                                </Link>
                                {/* <Nav.Link href="/bills">Quản lý đơn hàng</Nav.Link> */}
                                {/* </Nav.Item> */}
                                <p className="menu__link" onClick={handleLogout}>
                                    Đăng xuất
                                </p>
                            </Nav>
                        </Navbar.Collapse>
                    </> : null}
            </Container>
        </Navbar>
    );
}

export default Menu;