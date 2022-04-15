import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import clientUser from '../../../api/User/Client';
import { useHistory } from 'react-router-dom';

ClientLogin.propTypes = {

};

function ClientLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const handleSubmit = async (e) => {
        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        try {
            const response = await clientUser.login({ email, password });
            console.log(response);
            if (response.isSuccess) {
                const saveToken = { ...response.data, expiredTime: Date.now() };
                console.log(response.data);
                localStorage.setItem('client-info', JSON.stringify(saveToken))
                history.push('/dashboard')
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
                <h1>Đăng nhập trang Client</h1>
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
                        <button type="submit" className="p-2 m-2" >Đăng nhập</button>
                        <button type="submit" className="p-2 m-2" >Đăng ký</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ClientLogin;