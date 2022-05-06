import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import aboutImg from '../../../assets/images/about.svg'
import traditionalImg from '../../../assets/images/traditional.svg'
import solutionImg from '../../../assets/images/solution.svg'
import blockchainImg from '../../../assets/images/blockchain.svg'
import seeImg from '../../../assets/images/see.svg'
import projectImg from '../../../assets/images/project.svg'
import clsx from "clsx";
import Style from './About.module.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
About.propTypes = {

};

function About(props) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1200,
            anchorPlacement: 'bottom',
        });
    })
    return (
        <div className={clsx(Style.wrapAbout)}>
            {/* Về chúng tôi  */}
            <div className="container">
                <div className="d-flex flex-column flex-lg-row mb-5" data-aos="zoom-in">

                    <div className="">
                        <h2>Về chúng tôi</h2>
                        <p>Chúng tôi là Tấm Lòng Vàng, nền tảng quyên góp minh bạch với sự hỗ trợ của blockchain. Chúng tôi thúc đẩy hoạt động trao tiền điện tử mang tính biến đổi, sử dụng công nghệ mới làm công cụ từ thiện và đầu tư vào đổi mới, nghiên cứu và phát triển chuỗi khối.</p>
                        <p>Tác động lớn nhất của chúng tôi là hỗ trợ cho những người khó khăn có khả năng độc lập về tài chính thông qua việc áp dụng tiền điện tử.</p>
                        <p>Chúng tôi cách mạng hóa hoạt động trao tặng bằng cách minh bạch hơn và giải quyết các vấn đề phức tạp trong lĩnh vực xã hội như thiếu tin tưởng vào các tổ chức phi lợi nhuận, phí chuyển tiền cao, quy trình kém hiệu quả và thiếu trách nhiệm giải trình trong chi tiêu của các nhà tài trợ.</p>
                    </div>
                    <div className="mx-auto w-100">
                        <img src={aboutImg} width="100%" alt="về chúng tôi - Tấm Lòng Vàng" />
                    </div>
                </div>
            </div>
            {/*Tại sao nên chọn chúng tôi */}
            <div className={clsx(Style.whyUs, 'py-5')}>
                <div className="container">
                    <div className="text-center">
                        <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Tại sao nên chọn chúng tôi</p>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-6 py-4" data-aos="fade-right">
                            <div className="d-flex flex-column">
                                <img src={traditionalImg} height="100px" alt="" className="mx-auto" />
                                <p className="text-center fs-4 fw-bold pt-3">Mô hình từ thiện truyền thống</p>
                                <p className="text-center mt-0">Thời gian chờ đợi lâu</p>
                                <p className="text-center mt-0">Tốn phí giao dịch và dịch vụ</p>
                                <p className="text-center mt-0">Dễ bị gian lận</p>
                                <p className="text-center mt-0">Thiếu minh bạch</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 py-4" data-aos="fade-left">
                            <div className="d-flex flex-column">
                                <img src={solutionImg} height="100px" alt="" className="mx-auto" />
                                <p className="text-center fs-4 fw-bold pt-3">Giải pháp của chúng tôi</p>
                                <p className="text-center mt-0">Xác nhận giao dịch nhanh chóng</p>
                                <p className="text-center mt-0">Phí thấp và có thể miễn phí</p>
                                <p className="text-center mt-0">Truy cập mọi lúc, mọi nơi</p>
                                <p className="text-center mt-0">Tính minh bạch trong thời gian thực</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Điểm nổi bật */}
            <div className={clsx(Style.highlight, 'py-5')}>
                <div className="container">
                    <div className="text-center">
                        <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Điểm nổi bật</p>
                    </div>
                    <div className="row" data-aos="fade-up">
                        <div className="col-12 col-lg-4 py-4">
                            <div className="d-flex flex-column">
                                <img src={blockchainImg} height="100px" alt="" className="mx-auto" />
                                <p className="text-center lh-base mt-4 px-1 px-lg-5">Công nghệ blockchain cho phép các cá nhân, tổ chức tham gia đóng góp theo dõi các giao dịch trên nền tảng công khai trong thời gian thực.</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <div className="d-flex flex-column">
                                <img src={seeImg} height="100px" alt="" className="mx-auto" />
                                <p className="text-center lh-base mt-4 px-1 px-lg-5">Các cá nhân, tổ chức tham gia đóng góp có thể xem thông tin chi tiêu tiền và đảm bảo họ đưa đến mục tiêu cuối cùng.</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <div className="d-flex flex-column">
                                <img src={projectImg} height="100px" alt="" className="mx-auto" />
                                <p className="text-center lh-base mt-4 px-1 px-lg-5">Kết quả của dự án sẽ được chia sẽ trực tiếp và công khai cho các cá nhân, tổ chức tham gia đóng góp.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;