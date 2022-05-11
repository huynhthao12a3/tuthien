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
import defaultImg from "../../../assets/images/default_image.png"
import Loading from '../../../shares/Loading';
import * as utils from '../../../utils/utils'
ClientLogin.propTypes = {

};

function ClientLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validateEmail, setValidateEmail] = useState('')
    const [validatePhone, setValidatePhone] = useState('')
    const [validatePassword, setValidatePassword] = useState('')
    const [imgValue, setImgValue] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [clientDetail, setClientDetail] = useState({
        fullName: "",
        phoneNumber: "",
        avatarPath: "",
        password: "",
        rePassword: "",
        email: "",
        address: "",
        type: 1
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
        console.log('dữ liệu gửi đi: ', clientDetail)

        // setToken("1")
        // console.log('login success')
        // localStorage.setItem('token', JSON.stringify('test'));
        e.preventDefault();
        if (clientDetail.fullName !== "" &&
            clientDetail.phoneNumber !== "" &&
            clientDetail.address !== "" &&
            clientDetail.email !== "" &&
            clientDetail.password.length > 6

        ) {
            if (utils.isEmail(clientDetail.email)) {
                if (utils.isPhoneNumber(clientDetail.phoneNumber)) {
                    if (utils.checkPasswordMatch(clientDetail.password, clientDetail.rePassword)) {
                        setValidatePassword('')
                        setIsLoading(true)
                        try {
                            delete clientDetail.rePassword
                            const response = await clientUser.register(clientDetail);
                            if (response.isSuccess) {
                                setIsLoading(false)
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
                                setIsLoading(false)
                                swal2.fire({
                                    title: "Thông báo",
                                    html: `${response.message}`,
                                    icon: "info",
                                    confirmButtonColor: 'var(--love-color-1)'

                                });
                            }



                        } catch (error) {
                            setIsLoading(false)
                            console.error(error);
                            swal2.fire({
                                title: "Thông báo",
                                text: 'Đăng ký tài khoản không thành công.',
                                icon: "info",
                                confirmButtonColor: 'var(--love-color-1)'

                            });
                        }
                    } else {
                        setValidatePassword('Mật khẩu nhập lại không đúng.')
                        if (utils.isEmail(clientDetail.email)) {
                            setValidateEmail('')
                        }
                        if (utils.isPhoneNumber(clientDetail.phoneNumber)) {
                            setValidatePhone('')
                        }
                    }

                } else {
                    setValidatePhone('Sai định dạng số điện thoại')
                    if (utils.isEmail(clientDetail.email)) {
                        setValidateEmail('')
                    }
                    if (utils.checkPasswordMatch(clientDetail.password, clientDetail.rePassword)) {
                        setValidatePassword('')
                    }
                }
            } else {
                setValidateEmail('Sai định dạng email')
                if (utils.isPhoneNumber(clientDetail.phoneNumber)) {
                    setValidatePhone('')
                }
                if (utils.checkPasswordMatch(clientDetail.password, clientDetail.rePassword)) {
                    setValidatePassword('')

                }
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
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
        setPreviewImg(file)
        // fetchImage();
        // console.log(e.target.files[0])
    }

    useEffect(() => {
        if (location.pathname === '/register') {
            console.log(location.pathname)
            // toggleForm()
        }
    }, [])
    //đẩy ảnh lên API
    useEffect(() => {
        const fetchImage = async () => {
            let form = new FormData();
            form.append('Image', imgValue);
            form.append('TypeImage', "client");
            const response = await clientUser.uploadFile(form);
            if (response.isSuccess) {
                setClientDetail({ ...clientDetail, avatarPath: response.data.filePath })
            }
            else {
                swal2.fire({
                    title: "Thông báo",
                    text: `${response.message}`,
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
                setClientDetail({ ...clientDetail, avatarPath: "\\uploads\\Images\\logo\\11052022_021846_tam_long_vang_logo.png" })
            }
        }
        if (imgValue !== '') {
            fetchImage();
        }
    }, [imgValue])

    const handleValidateEmail = (e) => {
        if (utils.isEmail(e.target.value)) {
            setClientDetail({ ...clientDetail, email: e.target.value })
            setValidateEmail('')

        } else {
            setValidateEmail('Sai định dạng email')
        }
    }

    const handleValidatePhoneNumber = (e) => {
        if (utils.isPhoneNumber(e.target.value)) {
            setClientDetail({ ...clientDetail, phoneNumber: e.target.value })
            setValidatePhone('')
        } else {
            setValidatePhone('Sai định dạng số điện thoại')

        }
    }
    console.log(clientDetail)
    return (
        <>
            {
                isLoading ? <Loading /> : (
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
                                        <button type="submit" className="px-4 py-2 rounded-3 text-light mt-2" >Đăng nhập <i className="mdi mdi-login-variant"></i></button>

                                    </form>
                                </div>
                            </div>
                            <div className="user signupBx">
                                <div className="formBx">
                                    <form onSubmit={e => handleRegister(e)}>
                                        <h2>Đăng ký tài khoản</h2>
                                        <div className="w-100 position-relative">

                                            <img src={previewImg.review ? previewImg.review : defaultImg} className=" mx-auto d-block img-fluid rounded-pill" alt="Preview Register " style={{ width: '100px' }} />
                                            <input type="file" onChange={e => handleChangeAvatar(e)} className="w-100 h-100 position-absolute start-0 end-0 top-0 bottom-0" style={{ opacity: 0 }} />
                                        </div>
                                        <input type="text" placeholder="Họ và tên" onChange={e => setClientDetail({ ...clientDetail, fullName: e.target.value })} />
                                        <input type="number" placeholder="Số điện thoại" onChange={e => setClientDetail({ ...clientDetail, phoneNumber: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validatePhone}</span>
                                        <input type="text" placeholder="Địa chỉ" onChange={e => setClientDetail({ ...clientDetail, address: e.target.value })} />
                                        <input type="email" placeholder="Email" onChange={e => setClientDetail({ ...clientDetail, email: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validateEmail}</span>
                                        <input type="password" placeholder="Mật khẩu (> 6 kí tự)" onChange={e => setClientDetail({ ...clientDetail, password: e.target.value })} />
                                        <input type="password" placeholder="Nhập lại mật khẩu" onChange={e => setClientDetail({ ...clientDetail, rePassword: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validatePassword}</span>
                                        <label htmlFor="type" className="me-2">Loại tài khoản:</label>
                                        <select id="type" value={clientDetail.type} onChange={e => setClientDetail({ ...clientDetail, type: e.target.value })}>
                                            <option value="1">Cá nhân</option>
                                            <option value="2">Tổ chức</option>
                                        </select>
                                        <button type="submit" className="d-block px-4 py-2 rounded-3 text-light mt-2" >Đăng ký <i className="mdi mdi-login-variant"></i></button>

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
                )
            }

        </>
    );
}

export default ClientLogin;