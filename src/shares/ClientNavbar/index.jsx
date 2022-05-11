
import Style from './ClientNavbar.scss'
import React from 'react';
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
ClientNavbar.propTypes = {

};

function ClientNavbar() {
    const clientInfo = JSON.parse(localStorage.getItem('client-info'))
    // console.log(process.env.REACT_APP_URL)
    const handleLogout = () => {
        localStorage.clear();
        window.location.pathname = '/dashboard'
    }
    const location = useLocation().pathname
    console.log(location)
    return (
        <Navbar id="client-navbar" collapseOnSelect expand="xl" className={clsx(Style.clientNavbar, "bg-light text-dark shadow border-bottom flex-shrink-0")}>
            <div className='container-fluid'>
                <Navbar.Brand href="/dashboard">
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
                        <Nav.Link className={clsx(location === "/dashboard" ? "active" : "", "client-nav-link text-uppercase text-center fw-bold")} as={NavLink} to="/dashboard"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className={clsx(location === "/project" ? "active" : "", "client-nav-link text-uppercase text-center fw-bold")} as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className={clsx(location === "/news" ? "active" : "", "client-nav-link text-uppercase text-center fw-bold")} as={NavLink} to="/news"><i className="mdi mdi-newspaper me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className={clsx(location === "/tutorial" ? "active" : "", "client-nav-link text-uppercase text-center fw-bold")} as={NavLink} to="/tutorial"><i className="mdi mdi-note-multiple-outline me-2"></i>Hướng dẫn</Nav.Link>
                        <Nav.Link className={clsx(location === "/about" ? "active" : "", "client-nav-link text-uppercase text-center fw-bold")} as={NavLink} to="/about"><i className="mdi mdi-account-box-outline me-2"></i>Giới thiệu</Nav.Link>
                        <Nav.Link className={clsx(location === "/add-project" ? "active" : "", "create-project text-uppercase rounded-3 px-3 mx-3 text-decoration-none text-center fw-bold mt-3 mt-xl-0")} as={NavLink} to="/add-project">Tạo dự án</Nav.Link>

                    </Nav>


                    <div className="m-3 d-flex justify-content-end ">
                        {
                            clientInfo ?
                                (<div className="d-flex flex-column text-end">
                                    <span id="admin-navbar-email" className="px-2">Xin chào <span className="fw-bold">{clientInfo.fullName}</span>!</span>

                                    <NavDropdown title={'Donor'} id="nav-dropdown" className=' px-2'>
                                        <NavDropdown.Item as={NavLink} to="/profile" >Cá nhân</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogout} >Đăng xuất</NavDropdown.Item>
                                    </NavDropdown>
                                </div>) : (
                                    <div className="d-flex text-end align-items-center">
                                        <Link to="/login" className="text-decoration-none text-muted fw-bold border-end px-2 text-center">Đăng Nhập</Link>
                                        <Link to="/register" className="text-decoration-none text-muted fw-bold border-start px-2 text-center">Đăng Ký</Link>
                                    </div>
                                )
                        }


                        <img id="admin-img-avatar" src={clientInfo ? process.env.REACT_APP_URL + clientInfo.avatar : defaultAvatar} alt="" width="40" height="40" className=" rounded-circle border p-1" />
                    </div>

                </Navbar.Collapse>


            </div>
        </Navbar>
    );
}

export default ClientNavbar;