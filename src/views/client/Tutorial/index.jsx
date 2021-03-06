import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import Style from './Tutorial.module.scss'
import trxCoin from "../../../assets/images/trx-coin.svg"
import AOS from 'aos';
import 'aos/dist/aos.css';
Tutorial.propTypes = {

};

function Tutorial(props) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1200,
            anchorPlacement: 'bottom',
        });
    })
    return (
        <>
            <div className={clsx(Style.headerTutorial)}>
                <div className="container py-5" data-aos="zoom-in">
                    <h1 className="fs-3">Chúng tôi nhận đóng góp thông qua đồng TRX.</h1>
                    <div className="d-flex flex-column flex-md-row  mt-5">
                        <div className="mx-md-5">
                            <img src={trxCoin} alt="trx coin - tron nertwork" />
                        </div>
                        <div className="d-flex flex-column">
                            <p className="lh-base fs-5 ">Nếu bạn đã có TRX bên trong ví TronLink, chỉ cần đăng ký tài khoản Tấm Lòng Vàng và quyên góp TRX cho dự án yêu thích của bạn, sau đó xem dự án trên blockchain.</p>

                            <div className="d-flex">
                                <p className="me-2">Cài đặt ví <strong>TronLink</strong> tại đây: </p>
                                <a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec" target="_blank" rel="noreferrer" className="base-color text-decoration-none text-success" >TronLink</a>
                            </div>
                            <div className="d-flex">
                                <p className="me-2">Mua, bán <strong>TRX</strong> tại đây: </p>

                                <a href="https://www.binance.com/" target="_blank" rel="noreferrer" className="base-color text-decoration-none text-success me-2" >Binance</a>
                                <a href="https://www.kraken.com/" target="_blank" rel="noreferrer" className="base-color text-decoration-none text-success" >Kraken</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">

                {/* Hướng dẫn gây quỹ */}
                <div className="create-project">
                    <h2 className="fs-3 my-5">Bắt đầu gây quỹ cộng đồng với Tấm Lòng Vàng</h2>
                    <div className="row justify-content-evenly" data-aos="fade-right">
                        <div className="col-12 col-md-3 ">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>1</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Tạo ví TronLink</p>
                                    <p className={clsx(Style.description, 'px-2')}>Truy cập vào tiện ích TronLink trên Chrome, Microsoft Edge hoặc Cốc Cốc và tạo ví TronLink.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3 ">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>2</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Đăng ký tài khoản</p>
                                    <p className={clsx(Style.description, 'px-2')}>Truy cập vào website Tấm Lòng Vàng và đăng ký tài khoản của bạn gồm tên tài khoản, ảnh đại diện để cộng đồng dễ dàng nhận ra và tương tác với bạn.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3  ">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>3</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Tạo dự án gây quỹ</p>
                                    <p className={clsx(Style.description, 'px-2')}>Sử dụng chức năng “Tạo dự án” trên website Tấm Lòng Vàng để tạo chiến dịch, ban hành và chia sẻ mục tiêu gây quỹ với cộng đồng qua các nền tảng mạng xã hội.</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="row justify-content-evenly mt-3 mt-lg-5 " data-aos="fade-right">

                        <div className="col-12 col-md-3  ">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>4</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Xác minh dự án</p>
                                    <p className={clsx(Style.description, 'px-2')}>Chúng tôi xác minh dự án của bạn trên website Tấm Lòng Vàng và thông báo cho bạn.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>5</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Thực hiện mục tiêu đề ra</p>
                                    <p className={clsx(Style.description, 'px-2')}>Sử dụng nguồn tiền để chi tiêu, lịch sử thu chi từ tài khoản từ thiện được tự động sao kê minh bạch.</p>
                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-md-3 ">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>6</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Cập nhật hoạt động</p>
                                    <p className={clsx(Style.description, 'px-2')}>Cập nhật thường xuyên các hoạt động thực hiện mục tiêu gây quỹ bằng các hóa đơn, bài viết trên website Tấm Lòng Vàng.</p>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
                <hr></hr>
                {/* Hướng dẫn đóng góp */}
                <div className="create-project">
                    <h2 className="fs-3 my-5">Đóng góp hỗ trợ dự án</h2>
                    <div className="row" data-aos="fade-up">
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>1</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Xem dự án</p>
                                    <p className={clsx(Style.description, 'px-2 px-md-5')}>Truy cập vào website Tấm Lòng Vàng và xem các dự án đã tạo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>2</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Đóng góp</p>
                                    <p className={clsx(Style.description, 'px-2 px-md-5')}>Sử dụng chức năng “Đóng góp” trên website Tấm Lòng Vàng để đóng góp tiền cho dự án.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-row flex-md-column ">
                                <div className="flex-grow-1 mx-auto mb-3">
                                    <div className={clsx(Style.circle, " d-flex justify-content-center align-items-center")}>3</div>
                                </div>
                                <div className="ps-3 ps-md-0">
                                    <p className="lh-base fw-bold text-md-center px-2 p-md-0">Theo dõi dự án</p>
                                    <p className={clsx(Style.description, 'px-2 px-md-5')}>Theo dõi các chi tiêu của dự án thông qua lịch sử và các cập nhật.</p>
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div>
        </>

    );
}

export default Tutorial;