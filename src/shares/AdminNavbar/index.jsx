import './AdminNavbar.scss'
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.png'
import { mainColor } from '../../assets/js/main.js'
import defaultAvatar from '../../assets/images/default-avatar.jpg'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink,
    useRouteMatch
} from "react-router-dom";

AdminNavbar.propTypes = {

};
const styles = {
    backgroundColor: '#3E4851',
};
function AdminNavbar(props) {
    const info = "huynhthao12a3@gmail.com | Admin"
    return (
        <Navbar id="admin-navbar" collapseOnSelect expand="lg" style={styles} variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">
                    <img
                        alt="logo"
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/dashboard"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/user"><i className="mdi mdi-account-box-outline me-2"></i>Người dùng</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/donation"><i className="mdi mdi-history me-2"></i>Lịch sử quyên góp</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/news"><i className="mdi mdi-newspaper me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/category"><i className="mdi mdi-group me-2"></i>Danh mục</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/reclaim"><i className="mdi mdi-format-page-break me-2"></i>Kháng cáo</Nav.Link>

                    </Nav>


                    <NavDropdown title={info} id="nav-dropdown" className="d-none d-xl-block">
                        <NavDropdown.Item >Cá nhân</NavDropdown.Item>
                        <NavDropdown.Item >Đăng xuất</NavDropdown.Item>
                    </NavDropdown>
                    <img id="admin-img-avatar" src={defaultAvatar} alt="" width="30" height="30" className="d-none d-xl-block rounded-circle" />

                </Navbar.Collapse>


            </Container>
        </Navbar>
    );
}

export default AdminNavbar;