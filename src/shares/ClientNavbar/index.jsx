import Style from './ClientNavbar.module.scss'
import React from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import ContainerFluid from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.png'
import { mainColor } from '../../assets/js/main.js'
import defaultAvatar from '../../assets/images/default-avatar.jpg'
import Project from '../../views/client/Project';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink,
    useRouteMatch
} from "react-router-dom";
import clsx from 'clsx';

ClientNavbar.propTypes = {

};
const styles = {
    backgroundColor: '#3E4851',
};
function ClientNavbar(props) {
    const info = "tranthuan12a3@gmail.com"
    return (
        <>
    
        <Navbar id="admin-navbar" collapseOnSelect expand="lg" style={styles} variant="dark">
            <div className='container-fluid'>
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
                    <Nav className={clsx(Style.nav, 'me-auto')}>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/Home"><i className="mdi mdi-home-outline me-2"></i>Trang chủ</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/project"><i className="mdi mdi-archive-outline me-2"></i>Dự án</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/news"><i className="mdi mdi-account-box-outline me-2"></i>Tin tức</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/tutorial"><i className="mdi mdi-history me-2"></i>Hướng dẫn</Nav.Link>
                        <Nav.Link className="admin-nav-link pe-3" as={NavLink} to="/about"><i className="mdi mdi-newspaper me-2"></i>Giới thiệu</Nav.Link>
                    </Nav>

                    <div className={clsx(Style.DropAvatar)}>
                        <span className={clsx(Style.dropEmail)}>{info}</span>
                        <NavDropdown title={'Donor'} id="nav-dropdown" className={clsx(Style.DropDonor, 'dropdonor d-none d-xl-block')}>
                            <NavDropdown.Item >Cá nhân</NavDropdown.Item>
                            <NavDropdown.Item >Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </div>



                    <img id="admin-img-avatar" src={defaultAvatar} alt="" width="40" height="40" className="d-none d-xl-block rounded-circle me-4" />

                </Navbar.Collapse>


            </div>
        </Navbar>
       
        </>

    );
}

export default
    ClientNavbar;