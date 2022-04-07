// import Style from './ClientNavbar.module.scss'
// import React, { useEffect, useState } from 'react';
// import { Router } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Navbar from 'react-bootstrap/Navbar'
// import ContainerFluid from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import logo from '../../assets/images/logo.png'
// import { mainColor } from '../../assets/js/main.js'
// import defaultAvatar from '../../assets/images/default-avatar.jpg'
// import Project from '../../views/client/Project';
// import {
//     BrowserRouter,
//     Switch,
//     Route,
//     Link,
//     NavLink,
//     useRouteMatch
// } from "react-router-dom";
// import clsx from 'clsx';

// ClientNavbar.propTypes = {

// };
// const styles = {
//     backgroundColor: '#3E4851',
// };
// function ClientNavbar(props) {
//     const info = "tranthuan12a3@gmail.com"
//     const [windowWidth,setWindowWidth] = useState(window.innerWidth)
//     useEffect(()=>{
//         setWindowWidth(window.innerWidth)

//     })

//     return (
//         <>

//         <Navbar id="admin-navbar" className={clsx(Style.adminNavbar,'w-100 container-fluid ps-4 pe-4')} collapseOnSelect expand="lg" style={styles} variant="dark">
//             <div className={clsx(Style.navbarWrap)}>
//                 <Navbar.Brand href="/dashboard">
//                     <img
//                         alt="logo"
//                         src={logo}
//                         width="50"
//                         height="50"
//                         className="d-inline-block align-top"
//                     />{' '}
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                     <Nav className={clsx(Style.nav, 'me-auto')}>
//                         <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/Home"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
//                         <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
//                         <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/news"><i className="mdi mdi-account-box-outline me-2"></i>Tin tức</Nav.Link>
//                         <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/tutorial"><i className="mdi mdi-history me-2"></i>Hướng dẫn</Nav.Link>
//                         <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/about"><i className="mdi mdi-newspaper me-2"></i>Giới thiệu</Nav.Link>
//                     </Nav>

//                     <div className={clsx(Style.DropAvatar)}>
//                         <span className={clsx(Style.dropEmail)}>{info}</span>
//                         <NavDropdown title={'Donor'} id="nav-dropdown" className={clsx(Style.DropDonor, 'dropdonor d-none d-xl-block')}>
//                             <NavDropdown.Item >Cá nhân</NavDropdown.Item>
//                             <NavDropdown.Item >Đăng xuất</NavDropdown.Item>
//                         </NavDropdown>
//                     </div>



//                     <img id="admin-img-avatar" src={defaultAvatar} alt="" width="40" height="40" className="d-none d-xl-block rounded-circle me-4" />

//                 </Navbar.Collapse>


//             </div>
//         </Navbar>

//         </>

//     );
// }

// export default
//     ClientNavbar;

import Style from './ClientNavbar.module.scss'
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
ClientNavbar.propTypes = {

};

function ClientNavbar(props) {
    const info = "huynhthao12a3@gmail.com"
    return (
        <Navbar id="admin-navbar" collapseOnSelect expand="xl" className={clsx(Style.clientNavbar, "bg-light text-dark shadow")}>
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
                        <Nav.Link className="admin-nav-link text-uppercase text-center fw-bold" as={NavLink} to="/dashboard"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase text-center fw-bold" as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase text-center fw-bold" as={NavLink} to="/user"><i className="mdi mdi-account-box-outline me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase text-center fw-bold" as={NavLink} to="/donation"><i className="mdi mdi-history me-2"></i>Hướng dẫn</Nav.Link>
                        <Nav.Link className="admin-nav-link text-uppercase text-center fw-bold" as={NavLink} to="/news"><i className="mdi mdi-newspaper me-2"></i>Giới thiệu</Nav.Link>
                        <Nav.Link className={clsx(Style.createProject, " text-uppercase rounded-3 px-3 mx-3 text-decoration-none text-center fw-bold")} as={NavLink} to="/create-project">Tạo dự án</Nav.Link>

                    </Nav>



                    <div className="d-none d-xxl-flex flex-column text-end">
                        <span id="admin-navbar-email " className="px-2 text-dark">{info}</span>
                        <NavDropdown title={'Donor'} id="nav-dropdown" className='text-dark px-2'>
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

export default ClientNavbar;