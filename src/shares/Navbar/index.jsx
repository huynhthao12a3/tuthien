import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import './Navbar.module.scss'
import { mainColor } from '../../assets/js/main.js'
AdminNavbar.propTypes = {

};
const styles = {
    backgroundColor: '#3E4851',
};
function AdminNavbar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" style={styles} variant="dark">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Trang chủ</Nav.Link>
                        <Nav.Link href="#features">Dự án</Nav.Link>
                        <Nav.Link href="#features">Người dùng</Nav.Link>
                        <Nav.Link href="#features">Lịch sử quyên góp</Nav.Link>
                        <Nav.Link href="#features">Tin tức</Nav.Link>
                        <Nav.Link href="#features">Danh mục</Nav.Link>
                        <Nav.Link href="#features">Kháng cáo</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;