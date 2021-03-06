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
                        title: "Th??ng b??o",
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
                title: "Th??ng b??o",
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin ????ng nh???p.',
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    const handleRegister = async (e) => {
        console.log('d??? li???u g???i ??i: ', clientDetail)

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
                                    title: "Th??ng b??o",
                                    html: `${response.data}`,
                                    icon: "info",
                                    confirmButtonColor: 'var(--love-color-1)'
                                });
                                history.push('/dashboard')
                            }
                            else {
                                setIsLoading(false)
                                swal2.fire({
                                    title: "Th??ng b??o",
                                    html: `${response.message}`,
                                    icon: "info",
                                    confirmButtonColor: 'var(--love-color-1)'

                                });
                            }



                        } catch (error) {
                            setIsLoading(false)
                            console.error(error);
                            swal2.fire({
                                title: "Th??ng b??o",
                                text: '????ng k?? t??i kho???n kh??ng th??nh c??ng.',
                                icon: "info",
                                confirmButtonColor: 'var(--love-color-1)'

                            });
                        }
                    } else {
                        setValidatePassword('M???t kh???u nh???p l???i kh??ng ????ng.')
                        if (utils.isEmail(clientDetail.email)) {
                            setValidateEmail('')
                        }
                        if (utils.isPhoneNumber(clientDetail.phoneNumber)) {
                            setValidatePhone('')
                        }
                    }

                } else {
                    setValidatePhone('Sai ?????nh d???ng s??? ??i???n tho???i')
                    if (utils.isEmail(clientDetail.email)) {
                        setValidateEmail('')
                    }
                    if (utils.checkPasswordMatch(clientDetail.password, clientDetail.rePassword)) {
                        setValidatePassword('')
                    }
                }
            } else {
                setValidateEmail('Sai ?????nh d???ng email')
                if (utils.isPhoneNumber(clientDetail.phoneNumber)) {
                    setValidatePhone('')
                }
                if (utils.checkPasswordMatch(clientDetail.password, clientDetail.rePassword)) {
                    setValidatePassword('')

                }
            }

        } else {
            swal2.fire({
                title: "Th??ng b??o",
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin ????ng k??.',
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
            // console.log(location.pathname)
            toggleForm()
        }
    }, [])
    //?????y ???nh l??n API
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
                    title: "Th??ng b??o",
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
            setValidateEmail('Sai ?????nh d???ng email')
        }
    }

    const handleValidatePhoneNumber = (e) => {
        if (utils.isPhoneNumber(e.target.value)) {
            setClientDetail({ ...clientDetail, phoneNumber: e.target.value })
            setValidatePhone('')
        } else {
            setValidatePhone('Sai ?????nh d???ng s??? ??i???n tho???i')

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
                                        <img src={logoCharity} alt="T???m L??ng V??ng" />
                                    </Link>
                                    <p className="fs-5 fw-bold">Xin ch??o!</p>
                                    <p>N???u ch??a c?? t??i kho???n, vui l??ng ????ng k?? t???i ????y.</p>
                                    <button onClick={toggleForm} className="px-4 py-2 rounded-3" >????ng k??</button>

                                </div>
                                <div className="formBx">
                                    <form onSubmit={e => handleLogin(e)}>
                                        <h2>????ng nh???p h??? th???ng</h2>
                                        <input type="text" placeholder="T??n t??i kho???n / email" onChange={e => setEmail(e.target.value)} />
                                        <input type="password" placeholder="M???t kh???u" onChange={e => setPassword(e.target.value)} />
                                        <button type="submit" className="px-4 py-2 rounded-3 text-light mt-2" >????ng nh???p <i className="mdi mdi-login-variant"></i></button>

                                    </form>
                                </div>
                            </div>
                            <div className="user signupBx">
                                <div className="formBx">
                                    <form onSubmit={e => handleRegister(e)}>
                                        <h2>????ng k?? t??i kho???n</h2>
                                        <div className="w-100 position-relative">

                                            <img src={previewImg.review ? previewImg.review : defaultImg} className=" mx-auto d-block img-fluid rounded-pill" alt="Preview Register " style={{ width: '100px' }} />
                                            <input type="file" onChange={e => handleChangeAvatar(e)} className="w-100 h-100 position-absolute start-0 end-0 top-0 bottom-0" style={{ opacity: 0 }} />
                                        </div>
                                        <input type="text" placeholder="H??? v?? t??n" onChange={e => setClientDetail({ ...clientDetail, fullName: e.target.value })} />
                                        <input type="number" placeholder="S??? ??i???n tho???i" onChange={e => setClientDetail({ ...clientDetail, phoneNumber: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validatePhone}</span>
                                        <input type="text" placeholder="?????a ch???" onChange={e => setClientDetail({ ...clientDetail, address: e.target.value })} />
                                        <input type="email" placeholder="Email" onChange={e => setClientDetail({ ...clientDetail, email: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validateEmail}</span>
                                        <input type="password" placeholder="M???t kh???u (> 6 k?? t???)" onChange={e => setClientDetail({ ...clientDetail, password: e.target.value })} />
                                        <input type="password" placeholder="Nh???p l???i m???t kh???u" onChange={e => setClientDetail({ ...clientDetail, rePassword: e.target.value })} />
                                        <span className="d-block" style={{ fontSize: '12px', color: 'red' }}>{validatePassword}</span>
                                        <label htmlFor="type" className="me-2">Lo???i t??i kho???n:</label>
                                        <select id="type" value={clientDetail.type} onChange={e => setClientDetail({ ...clientDetail, type: Number(e.target.value) })}>
                                            <option value="1">C?? nh??n</option>
                                            <option value="2">T??? ch???c</option>
                                        </select>
                                        <button type="submit" className="d-block px-4 py-2 rounded-3 text-light mt-2" >????ng k?? <i className="mdi mdi-login-variant"></i></button>

                                    </form>

                                </div>
                                <div className="imgBx d-flex flex-column align-items-center justify-content-center">
                                    <Link to="./dashboard" className="py-5">
                                        <img src={logoCharity} alt="T???m L??ng V??ng" />
                                    </Link>
                                    <p className="fs-5 fw-bold">Xin ch??o!</p>
                                    <p>N???u ???? c?? t??i kho???n, vui l??ng ????ng nh???p t???i ????y.</p>
                                    <button type="submit" onClick={toggleForm} className="px-4 py-2 rounded-3" >????ng nh???p</button>

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