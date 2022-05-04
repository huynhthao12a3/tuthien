
import React from 'react';
import PropTypes from 'prop-types';
import Style from './ClientFooter.module.scss';
import clsx from 'clsx';
import { Link } from "react-router-dom";
ClientFooter.propTypes = {

};

function ClientFooter(props) {
    return (
        <div id="client-footer" className="   bg-light border-top">

            <div className={clsx(Style.wrapFooter, " container py-5")}>
                <div className='row'>
                    <div className={clsx(Style.about, "col-12 col-md-4 px-4")}>
                        <div className={clsx(Style.title, "fs-5 fw-bold text-uppercase w-100 py-2")}>Thông tin</div>
                        <p className={clsx(Style.content, "text-dark py-3")}>
                            Tấm Lòng Vàng là phiên bản ứng dụng blockchain trong hoạt động từ thiện, được thành lập dựa trên tinh thần tương thân tương ái của người dân Việt Nam. <br />
                            Website có phạm vi hoạt động toàn quốc.
                        </p>
                    </div>
                    <div className={clsx(Style.contact, "col-12   col-md-4 px-4 ")}>
                        <div className={clsx(Style.title, "fs-5 fw-bold text-uppercase w-100 py-2")}>Hướng dẫn - giới thiệu</div>
                        <div className={clsx(Style.content, "text-dark py-3")}>
                            <Link onClick={() => window.scrollTo(0, 0)} className="text-decoration-none text-dark text-uppercase d-block py-1" to='/about'>
                                Giới thiệu
                            </Link>
                            <Link onClick={() => window.scrollTo(0, 0)} className="text-decoration-none text-dark text-uppercase d-block py-1" to='/tutorial'>
                                Hướng dẫn đóng góp
                            </Link>
                            <Link onClick={() => window.scrollTo(0, 0)} className="text-decoration-none text-dark text-uppercase d-block py-1" to='/tutorial'>
                                Hướng dẫn tạo dự án
                            </Link>

                        </div>
                    </div>
                    <div className={clsx(Style.infomation, "col-12  col-md-4 px-4 d-flex flex-column")}>
                        <div className={clsx(Style.title, "fs-5 fw-bold text-uppercase w-100 py-2")}>Liên hệ chúng tôi</div>
                        <div className={clsx(Style.content, "text-dark py-3")}>
                            <p className="m-0 text-uppercase py-1">Hotline: 098.916.3020</p>
                            <p className="m-0 text-uppercase py-1">Email: thuanhieuthao@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={clsx(Style.endFooter)}>
                <div className="container py-5">

                    <div className="row ">
                        <div className="col-12">
                            <div className="text-center py-1">

                                <a className="text-decoration-none text-dark text-uppercase px-3" href='/facebook'  >
                                    <i className="mdi mdi-facebook fs-3 me-2 text-light"></i>
                                </a>
                                <a className="text-decoration-none text-dark text-uppercase px-3" href='/youtube'  >
                                    <i className="mdi mdi-youtube fs-3 me-2 text-light"></i>
                                </a>
                                <a className="text-decoration-none text-dark text-uppercase px-3" href='/instagram'  >
                                    <i className="mdi mdi-instagram fs-3 me-2 text-light"></i>
                                </a>
                            </div>
                            <p className="m-0 text-center text-light fs-4 fw-bold">TẤM LÒNG VÀNG</p>
                            <p className="m-0 text-center text-light fw-light">Địa chỉ: KP5, Phường Trảng Dài ,Thành phố Biên Hòa, Tỉnh Đồng Nai</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ClientFooter;