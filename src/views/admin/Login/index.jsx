import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import adminUser from '../../../api/User/Admin';
import { useHistory, Link } from "react-router-dom";
import * as alertify from 'alertifyjs';
import logoCharity from '../../../assets/images/logo-charity.png'


AdminLogin.propTypes = {

};

function AdminLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    localStorage.clear();

    const handleLogin = async (e) => {
        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        try {
            const response = await adminUser.login({ email, password });
            console.log(response);
            if (response.isSuccess) {
                const saveToken = { ...response.data, expiredTime: Date.now() };
                localStorage.setItem('admin-info', JSON.stringify(saveToken))
                history.push('/admin/dashboard')
                window.location.reload()
            }
            else {
                alertify.alert('Thông báo', response.message);
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>

            <section className="login-form-client">

                <div className="container">
                    <div className="user signinBx">
                        <div className="imgBx d-flex flex-column align-items-center justify-content-center">
                            <img src={logoCharity} alt="Tấm Lòng Vàng" />

                        </div>
                        <div className="formBx">
                            <form onSubmit={e => handleLogin(e)}>
                                <h2 className="fs-5">Quản trị hệ thống</h2>
                                <input type="text" placeholder="Tên tài khoản / email" onChange={e => setEmail(e.target.value)} />
                                <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
                                <button type="submit" className="px-4 py-2 rounded-3 text-light mt-2" >Đăng nhập</button>

                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default AdminLogin;