import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import adminUser from '../../../api/User/Admin';
import alertify from 'alertifyjs';
import { useHistory } from "react-router-dom";

AdminLogin.propTypes = {

};

function AdminLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleSubmit = async (e) => {
        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        try {
            const response = await adminUser.login({ email, password });
            console.log(response);
            if (response.isSuccess) {
                localStorage.setItem('admin-info', JSON.stringify(response.data))
                history.push('/admin/dashboard')
            }
            else {
                console.log(response.message);
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="d-flex flex-column mt-5 align-items-center">
                <h1>Đăng nhập trang Admin</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit" className="p-2" >Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminLogin;