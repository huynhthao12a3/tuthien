import './AdminNavbar.scss'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.png'
import logoCharity from '../../assets/images/logo-charity.png'
import logoCharityLoading from '../../assets/images/logo-charity-loading.png'
import { mainColor } from '../../assets/js/main.js'
import defaultAvatar from '../../assets/images/default-avatar.jpg'

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink,
    useRouteMatch,
    useLocation
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import clsx from "clsx";

// import AdminNavbar from "./index";


AdminNavbar.propTypes = {

};

function AdminNavbar() {
    const adminInfo = JSON.parse(localStorage.getItem('admin-info'))
    const handleLogout = () => {
        localStorage.clear();
        window.location.pathname = '/admin/login'
    }
    const location = useLocation().pathname;
    return (
        <Navbar id="admin-navbar" collapseOnSelect expand="xl" className="bg-white text-dark shadow border-bottom flex-shrink-0">
            <div className='container-fluid'>
                <Navbar.Brand href="/admin/dashboard">
                    <img
                        alt="logo"
                        src={logoCharityLoading}
                        width="260px"
                        className=" d-inline-block "
                    />{' '}
                    {/* <div style={{ width: '100px', height: '80px' }}>

                        <Icon />
                    </div> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className={clsx(location === "/admin/dashboard" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/dashboard"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className={clsx(location === "/admin/project" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className={clsx(location === "/admin/user" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/user"><i className="mdi mdi-account-box-outline me-2"></i>Người dùng</Nav.Link>
                        <Nav.Link className={clsx(location === "/admin/donation" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/donation"><i className="mdi mdi-history me-2"></i>Lịch sử quyên góp</Nav.Link>
                        <Nav.Link className={clsx(location === "/admin/news" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/news"><i className="mdi mdi-newspaper me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className={clsx(location === "/admin/category" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/category"><i className="mdi mdi-group me-2"></i>Danh mục</Nav.Link>
                        {/* <Nav.Link className={clsx(location === "/admin/reclaim" ? "active" : "", "admin-nav-link text-uppercase fw-bold")} as={NavLink} to="/admin/reclaim"><i className="mdi mdi-format-page-break me-2"></i>Kháng cáo</Nav.Link> */}

                    </Nav>



                    {/* <div className="d-none d-xxl-flex flex-column text-end">
                        <span id="admin-navbar-email " className="px-2 text-dark">{info}</span>
                        <NavDropdown title={'Admin'} id="nav-dropdown" className='text-dark px-2'>
                            <NavDropdown.Item >Cá nhân</NavDropdown.Item>
                            <NavDropdown.Item >Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <img id="admin-img-avatar" src={defaultAvatar} alt="" width="40" height="40" className="d-none d-xxl-block rounded-circle" /> */}
                    <div className="m-3 d-flex justify-content-end ">
                        {
                            adminInfo ?
                                (<div className="d-flex flex-column text-end">
                                    <span id="admin-navbar-email" className="px-2">Xin chào <span className="fw-bold">{adminInfo.fullName}</span>!</span>
                                    <NavDropdown title={'Admin'} id="nav-dropdown" className='text-dark px-2'>
                                        {/* <NavDropdown.Item as={Link} to={"profile/" + adminInfo.userId}>Cá nhân</NavDropdown.Item> */}
                                        <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                    </NavDropdown>
                                </div>) : (
                                    <div className="d-flex text-end align-items-center">
                                        <Link to="/admin/login" className="text-decoration-none text-muted fw-bold border-end px-2 text-center">Đăng Nhập</Link>
                                        {/* <Link to="/admin/register" className="text-decoration-none text-muted fw-bold border-start px-2 text-center">Đăng Ký</Link> */}
                                    </div>
                                )
                        }


                        <img id="admin-img-avatar" src={adminInfo ? process.env.REACT_APP_URL + adminInfo.avatar : defaultAvatar} alt="" width="40" height="40" className=" rounded-circle border p-1" />
                    </div>
                </Navbar.Collapse>


            </div>
        </Navbar>
    );
}

export default AdminNavbar;