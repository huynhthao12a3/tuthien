import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from "react-router-dom";
import swal2 from "sweetalert2";
import clientUser from '../../../api/User/Client';

ChangePassword.propTypes = {

};

function ChangePassword(props) {
    const { search } = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(search);
    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(searchParams.get("email"));
    }, [])
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const handleChangePassword = async (e) => {
        console.log("change password")
        console.log(email)
        if (newPassword.length > 6) {

            if (newPassword.localeCompare(confirmPassword) === 0) {
                const response = await clientUser.changePassword(
                    {
                        email,
                        newPassword: newPassword
                    }
                )
                if (response.isSuccess) {
                    history.push('/dashboard')
                    swal2.fire({
                        title: "Thông báo",
                        html: 'Bạn đã đổi mật khẩu thành công.',
                        icon: "success",
                        confirmButtonColor: 'var(--love-color-1)'

                    });
                }
                else {
                    history.push('/dashboard')
                    swal2.fire({
                        title: "Thông báo",
                        html: `${response.message}`,
                        icon: "info",
                        confirmButtonColor: 'var(--love-color-1)'

                    });

                }
            } else {
                swal2.fire({
                    title: "Thông báo",
                    html: `Xác nhận mật khẩu không khớp. Vui lòng nhập lại.`,
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });

            }
        }
        else {
            swal2.fire({
                title: "Thông báo",
                html: `Mật khẩu phải tối thiểu 6 kí tự. Vui lòng nhập đầy đủ..`,
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });

        }

    }
    return (
        <div className="container py-5">
            <div className="row">
                <div className="d-flex justify-content-center flex-column">
                    <input className="form-control my-5 px-3" type="password" placeholder="Mật khẩu mới" onChange={e => setNewPassword(e.target.value)} />
                    <input className="form-control mb-5 px-3" type="password" placeholder="Nhập lại mật khẩu mới" onChange={e => setConfirmPassword(e.target.value)} />
                    <button onClick={e => handleChangePassword(e)} className="py-2">Xác nhận</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;