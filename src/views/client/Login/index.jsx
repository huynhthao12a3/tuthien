import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import clientUser from '../../../api/User/Client';
import { useHistory, useLocation } from 'react-router-dom';
import * as Style from './Login.scss'
// Sweet Alert  
import swal2 from 'sweetalert2'
import { Link } from "react-router-dom";
import logoCharity from '../../../assets/images/logo-charity.png'
ClientLogin.propTypes = {

};

function ClientLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imgValue, setImgValue] = useState('')
    const [clientDetail, setClientDetail] = useState({
        fullName: "",
        phoneNumber: "",
        avatarPath: "",
        password: "",
        email: "",
        address: "",
        type: 2
    })

    localStorage.clear();

    const history = useHistory();
    const location = useLocation();

    const handleLogin = async (e) => {
        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        if (email !== "" && password !== "") {
            try {

                const response = await clientUser.login({ email, password });
                if (response.isSuccess) {
                    const saveToken = { ...response.data, expiredTime: Date.now() };
                    console.log(response.data);
                    localStorage.setItem('client-info', JSON.stringify(saveToken))
                    history.push('/dashboard')
                    window.location.reload()
                }
                else {
                    swal2.fire({
                        title: "Thông báo",
                        html: `${response.message}`,
                        icon: "info",
                        confirmButtonColor: 'var(--love-color-1)'

                    });
                }



            } catch (error) {
                console.error(error);
            }
        } else {
            swal2.fire({
                title: "Thông báo",
                text: 'Vui lòng nhập đầy đủ thông tin đăng nhập.',
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    const handleRegister = async (e) => {
        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        if (clientDetail.fullName !== "" &&
            clientDetail.phoneNumber !== "" &&
            clientDetail.address !== "" &&
            clientDetail.email !== "" &&
            clientDetail.password !== ""
        ) {
            try {

                const response = await clientUser.register(clientDetail);
                if (response.isSuccess) {
                    console.log(response.data);
                    swal2.fire({
                        title: "Thông báo",
                        html: `${response.data}`,
                        icon: "info",
                        confirmButtonColor: 'var(--love-color-1)'
                    });
                    history.push('/dashboard')
                }
                else {
                    swal2.fire({
                        title: "Thông báo",
                        html: `${response.message}`,
                        icon: "info",
                        confirmButtonColor: 'var(--love-color-1)'

                    });
                }



            } catch (error) {
                console.error(error);
            }
        } else {
            swal2.fire({
                title: "Thông báo",
                text: 'Vui lòng nhập đầy đủ thông tin đăng ký.',
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }
    const toggleForm = () => {
        const container = document.querySelector('.container');
        container.classList.toggle('active');
    };
    const handleChangeAvatar = (e) => {
        setImgValue(e.target.files[0])
        console.log(e.target.files[0])
    }

    //đẩy ảnh lên API
    useEffect(() => {
        if (location.pathname === '/register') {
            console.log(location.pathname)
            toggleForm()
        }
        const fetchImage = async () => {
            let form = new FormData();
            form.append('Image', imgValue);
            form.append('TypeImage', "client");
            const response = await clientUser.uploadFile(form);
            if (response.isSuccess) {
                setClientDetail({ ...clientDetail, avatarPath: response.data.filePath })
            }
            else {
                setClientDetail({ ...clientDetail, avatarPath: "\\uploads\\Images\\User_Avatars\\28042022_030444_anymous_icon.png" })
            }
        }
        fetchImage();
    }, [imgValue])
    console.log(clientDetail)
    return (
        <>
            {/* <div className="d-flex flex-column mt-5 align-items-center">
                <h1>Đăng nhập trang Client</h1>
                <form >
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
            </div> */}
            <section className="login-form-client">

                <div className="container">
                    <div className="user signinBx">
                        <div className="imgBx d-flex flex-column align-items-center justify-content-center">
                            <Link to="./dashboard" className="py-5">
                                <img src={logoCharity} alt="Tấm Lòng Vàng" />
                            </Link>
                            <p className="fs-5 fw-bold">Xin chào!</p>
                            <p>Nếu chưa có tài khoản, vui lòng đăng ký tại đây.</p>
                            <button onClick={toggleForm} className="px-4 py-2 rounded-3" >Đăng ký</button>

                        </div>
                        <div className="formBx">
                            <form onSubmit={e => handleLogin(e)}>
                                <h2>Đăng nhập hệ thống</h2>
                                <input type="text" placeholder="Tên tài khoản / email" onChange={e => setEmail(e.target.value)} />
                                <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
                                <button type="submit" className="px-4 py-2 rounded-3 text-light mt-2" >Đăng nhập</button>

                            </form>
                        </div>
                    </div>
                    <div className="user signupBx">
                        <div className="formBx">
                            <form onSubmit={e => handleRegister(e)}>
                                <h2>Đăng ký tài khoản</h2>
                                <input type="file" onChange={e => handleChangeAvatar(e)} />
                                <input type="text" placeholder="Họ và tên" onChange={e => setClientDetail({ ...clientDetail, fullName: e.target.value })} />
                                <input type="number" placeholder="Số điện thoại" onChange={e => setClientDetail({ ...clientDetail, phoneNumber: e.target.value })} />
                                <input type="text" placeholder="Địa chỉ" onChange={e => setClientDetail({ ...clientDetail, address: e.target.value })} />
                                <input type="email" placeholder="Email" onChange={e => setClientDetail({ ...clientDetail, email: e.target.value })} />
                                <input type="password" placeholder="Mật khẩu" onChange={e => setClientDetail({ ...clientDetail, password: e.target.value })} />
                                <button type="submit" className="px-4 py-2 rounded-3 text-light mt-2" >Đăng ký</button>

                            </form>

                        </div>
                        <div className="imgBx d-flex flex-column align-items-center justify-content-center">
                            <Link to="./dashboard" className="py-5">
                                <img src={logoCharity} alt="Tấm Lòng Vàng" />
                            </Link>
                            <p className="fs-5 fw-bold">Xin chào!</p>
                            <p>Nếu đã có tài khoản, vui lòng đăng nhập tại đây.</p>
                            <button type="submit" onClick={toggleForm} className="px-4 py-2 rounded-3" >Đăng nhập</button>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ClientLogin;