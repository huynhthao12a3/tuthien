import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from "react-router-dom";
import swal2 from "sweetalert2";
import clientUser from '../../../api/User/Client';
import Loading from "./../../../shares/Loading/index";

ConfirmEmail.propTypes = {

};

function ConfirmEmail(props) {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const email = encodeURIComponent(searchParams.get("email"));
    const code = encodeURIComponent(searchParams.get("code").replaceAll(' ', '+'));
    console.log('email: ', email);
    console.log('code: ', code);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchConfirmEmail = async () => {
            const params = {
                email,
                code
            }
            const response = await clientUser.confirmEmail(params)
            if (response.isSuccess) {
                setIsLoading(false)
                swal2.fire({
                    title: "Thông báo",
                    html: `Kết quả xác minh: ${response.message}`,
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
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
        }
        fetchConfirmEmail()
    }, [email])
    return (
        <>
            {isLoading ? <Loading /> : ""}
        </>
    );
}

export default ConfirmEmail;