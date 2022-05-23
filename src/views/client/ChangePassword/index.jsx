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

    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState();
    useEffect(() => {
        setEmail(searchParams.get("email"));
        // const fetchConfirmEmail = async () => {
        //     const params = {
        //         email
        //     }
        //     const response = await clientUser.confirmEmail(params)
        //     if (response.isSuccess) {
        //         history.push('/dashboard')
        //         setIsLoading(false)
        //         swal2.fire({
        //             title: "Thông báo",
        //             html: `Kết quả xác minh: ${response.message}`,
        //             icon: "info",
        //             confirmButtonColor: 'var(--love-color-1)'

        //         });
        //     }
        //     else {
        //         history.push('/dashboard')
        //         setIsLoading(false)
        //         swal2.fire({
        //             title: "Thông báo",
        //             html: `${response.message}`,
        //             icon: "info",
        //             confirmButtonColor: 'var(--love-color-1)'

        //         });

        //     }
        // }
        // fetchConfirmEmail()
    }, [])
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const handleChangePassword = async (e) => {
        e.preventDefault()
        console.log("change password")
        console.log(email)
        // const response = await clientUser.changePassword(
        //     {
        //         email,
        //         newPassword: ""
        //     }
        // )
    }
    return (
        <div className="container py-5">
            <div className="row">
                <form onSubmit={e => handleChangePassword(e)} className="d-flex justify-content-center flex-column">
                    <input className="form-control my-5 px-3" type="text" placeholder="Mật khẩu mới" onChange={e => setNewPassword(e.target.value)} />
                    <input className="form-control mb-5 px-3" type="text" placeholder="Nhập lại mật khẩu mới" onChange={e => setConfirmPassword(e.target.value)} />
                    <button onClick={e => handleChangePassword(e)} className="py-2">Xác nhận</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;