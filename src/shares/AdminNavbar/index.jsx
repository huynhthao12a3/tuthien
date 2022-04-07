import './AdminNavbar.scss'
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.png'
import logoCharity from '../../assets/images/logo-charity.png'
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
import Icon from '../Icon';
import Nav from "react-bootstrap/Nav";
import clsx from "clsx";

// import AdminNavbar from "./index";
AdminNavbar.propTypes = {

};

function AdminNavbar(props) {
    const info = "huynhthao12a3@gmail.com"
    return (
        <Navbar id="admin-navbar" collapseOnSelect expand="xl" className="bg-white text-dark shadow border-bottom">
            <div className='container-fluid'>
                <Navbar.Brand href="/dashboard">
                    <img
                        alt="logo"
                        src={logoCharity}
                        width="120px"
                        className=" d-inline-block "
                    />{' '}
                    {/* <div style={{ width: '100px', height: '80px' }}>

                        <Icon />
                    </div> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/dashboard"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/user"><i className="mdi mdi-account-box-outline me-2"></i>Người dùng</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/donation"><i className="mdi mdi-history me-2"></i>Lịch sử quyên góp</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/news"><i className="mdi mdi-newspaper me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/category"><i className="mdi mdi-group me-2"></i>Danh mục</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase fw-bold" as={NavLink} to="/reclaim"><i className="mdi mdi-format-page-break me-2"></i>Kháng cáo</Nav.Link>

                    </Nav>



                    <div className="d-none d-xxl-flex flex-column text-end">
                        <span id="admin-navbar-email " className="px-2 text-dark">{info}</span>
                        <NavDropdown title={'Admin'} id="nav-dropdown" className='text-dark px-2'>
                            <NavDropdown.Item >Cá nhân</NavDropdown.Item>
                            <NavDropdown.Item >Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <img id="admin-img-avatar" src={defaultAvatar} alt="" width="40" height="40" className="d-none d-xxl-block rounded-circle" />

                </Navbar.Collapse>


            </div>
        </Navbar>
    );
}

export default AdminNavbar;