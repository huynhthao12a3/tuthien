import React from 'react';
import PropTypes from 'prop-types';
import dashboardBanner from '../../../assets/images/dashboard_banner.jpg'
import dashboardBanner1 from '../../../assets/images/dashboard_banner1.jpg'
import dashboardBanner2 from '../../../assets/images/dashboard_banner2.jpg'
import introItem from '../../../assets/images/intro_item.png'
import introBanner from '../../../assets/images/intro_banner.png'
import handBanner from '../../../assets/images/banner_hand.jpg'
import banner from '../../../assets/images/banner.png'
import banner1 from '../../../assets/images/banner1.png'
import donate from '../../../assets/images/donate.svg'
import createProject from '../../../assets/images/create_project.svg'
import charityBanner from '../../../assets/images/charity_banner.jpg'
import once from '../../../assets/images/duynhat.png'
import blockchain from '../../../assets/images/blockchain.png'
import misson from '../../../assets/images/misson.png'

import clsx from "clsx";
import Style from './Dashboard.module.scss'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import projectApi from '../../../api/Project'
import Loading from '../../../shares/Loading';
import SetInnerHTML from '../../../shares/setInnerHTML';
import ProgressBar from "react-bootstrap/ProgressBar";
import * as utils from '../../../utils/utils.js';

// Slider trong React Slick
import Slider from "react-slick";
// Thư viện xử lý ngày tháng 
import moment from 'moment'
import newsApi from '../../../api/News';
import AOS from 'aos';
import 'aos/dist/aos.css';
import clientUser from '../../../api/User/Client';
DashboardClient.propTypes = {

};

function DashboardClient(props) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 2000,
            anchorPlacement: 'bottom',
        });
    }, [])
    // Lấy giá TRX
    const [trxPrice, setTrxPrice] = useState();
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
            .then(res => res.json())
            .then(res => { setTrxPrice(res.tron.vnd) })
    }, [])

    // Lấy danh sách project
    const [projectList, setProjectList] = useState([])
    // Lấy danh sách tin tức
    const [newsList, setNewsList] = useState([])
    const [dashboardReport, setDashboardReport] = useState({
        amountDonated: "19446.00 TRX",
        donated: 26,
        projectCreated: 4

    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchDataProjectList = async () => {
            const params = {
                status: 2,
                currentpage: 0
            }
            const response = await projectApi.getAll(params)
            if (response.isSuccess) {
                setProjectList(response.data)
                setIsLoading(false)
                console.log('danh sách project: ', response.data)
            }
        }
        const fetchDateNewsList = async () => {
            const params = {
                pageindex: 0,
                status: 2
            }
            const response = await newsApi.getAll(params)

            if (response.isSuccess) {
                setNewsList(response.data)
                setIsLoading(false)
                console.log('danh sách news: ', response.data)
            }
        }
        const fetchDashboardReport = async () => {
            const params = {
                year: 2022
            }
            const response = await clientUser.dashboardStatistical(params)

            if (response.isSuccess) {
                setDashboardReport(response.data)
                setIsLoading(false)
                console.log('report : ', response.data)
            }
        }
        fetchDashboardReport()
        fetchDataProjectList()
        fetchDateNewsList()
    }, [])




    const settingSliderNews = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    }
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <>

                        {/* Phần Banner */}
                        <div className={clsx(Style.dashboardBanner, 'position-relative')}>
                            <img src={dashboardBanner1} className="img-fluid w-100 "
                                alt="Chia sẽ từ tấm lòng, lan tỏa những điều tốt đẹp" />

                            <div className="position-absolute start-0 end-0 top-0 pt-3 pt-lg-5" data-aos="fade-down">
                                <p className={clsx(Style.titleBanner, " lh-base text-center")} >
                                    Chia sẽ từ tấm lòng
                                </p>
                                <p className={clsx(Style.titleBanner, " lh-base text-center")} >
                                    Lan tỏa những điều tốt đẹp
                                </p>
                            </div>

                        </div >

                        {/* Phần đầu  */}
                        <div className={clsx(Style.headerDashboard)} >
                            <div className="container-fluid ">
                                <div className="row ">
                                    <div className="col-12 col-md-6 mx-auto">
                                        <h1 className="text-center fs-1 lh-base">Giải pháp công nghệ đồng hành cùng hoạt động từ thiện minh bạch</h1>
                                    </div>
                                </div>


                            </div>
                            <div className={clsx(Style.headerItem)}>

                                <div className="container mt-5">
                                    <div className="row mb-3 mb-lg-5">
                                        <div className="col-12 col-md-6  p-3 p-md-4" data-aos="fade-right" >
                                            <div className={clsx(Style.introItem, 'shadow overflow-hidden ')}>
                                                <img src={banner1} alt="" className="img-fluid" />

                                            </div>

                                        </div>
                                        <div className="col-12 col-md-6  p-3 p-md-4 align-self-center" data-aos="fade-left"  >
                                            <div className={clsx(Style.introItem)}>
                                                <h2 className="fs-2 lh-base ">Minh bạch cho người lập dự án</h2>
                                                <p className="fs-4 ">Giúp tự động thống kê và công khai 24/7 mọi số tiền nhận ủng hộ và chi tiêu thông qua địa chỉ ví.</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row mb-3 mb-lg-5">

                                        <div className="col-12 col-md-6 order-2 order-md-1 p-3 p-md-4 align-self-center" data-aos="fade-right" >
                                            <div className={clsx(Style.introItem)}>
                                                <h2 className="fs-2 lh-base ">Niềm tin cho người đóng góp</h2>
                                                <p className="fs-4 ">Giúp thuận tiện theo dõi thông tin tài chính các chiến dịch thiện nguyện mà mình quan tâm hay dễ dàng tương tác, hỗ trợ kịp thời cho người gây quỹ.</p>
                                            </div>

                                        </div>
                                        <div className="col-12 col-md-6 order-1 order-md-2 p-3 p-md-4" data-aos="fade-left" >
                                            <div className={clsx(Style.introItem, 'shadow overflow-hidden ')}>
                                                <img src={banner} alt="" className="img-fluid" />

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Intro */}
                        <div className={clsx(Style.intro)}>
                            <div className="container">
                                <div className=" p-3 p-lg-5 position-relative" data-aos="zoom-in" >

                                    <p className="fs-3 lh-base fst-italic text-center" >
                                        "Chúng tôi hoạt động không vì lợi nhuận, trên nguyên tắc hỗ trợ kêu gọi vốn, nhằm mục đích từ thiện. Hỗ trợ và khuyến khích phát triển giáo dục, an sinh xã hội, sức khỏe, thể dục thể thao, khoa học."
                                    </p>
                                    <p className="fs-3 lh-base fst-italic text-center" >
                                        "Với nhiều hoạt động lớn có ý nghĩa xã hội và nhân văn trên cả nước, Tấm Lòng Vàng đã và đang nỗ lực hết sức để hoàn thành sứ mệnh của mình, trở thành một điển hình cho tinh thần tương thân tương ái của người Việt."
                                    </p>
                                </div>
                            </div>
                            <img src={handBanner} alt="" className="img-fluid w-100" />
                        </div>
                        {/*Giá trị của chúng tôi */}
                        <div className={clsx(Style.valuesDashboard)}>
                            <div className="container">
                                <div className="text-center">

                                    <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Giá trị của chúng tôi</p>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-lg-4 py-4">
                                        <div className="d-flex flex-column">
                                            <img src={once} height="100px" alt="" className="mx-auto" />
                                            <p className="text-center fs-4 fw-bold pt-3">Duy nhất</p>
                                            <p className="text-center px-5">Giải pháp blockchain duy nhất tại Việt nam tự động cập nhật và công khai minh bạch sao kê với cộng đồng từ thiện.</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 py-4">
                                        <div className="d-flex flex-column">
                                            <img src={blockchain} height="100px" alt="" className="mx-auto" />
                                            <p className="text-center fs-4 fw-bold pt-3">Minh bạch</p>
                                            <p className="text-center px-5">Cung cấp một quy trình hoàn toàn có thể theo dõi, có trách nhiệm giải trình và bất biến.</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 py-4">
                                        <div className="d-flex flex-column">
                                            <img src={misson} height="100px" alt="" className="mx-auto" />
                                            <p className="text-center fs-4 fw-bold pt-3">Nhiệm vụ</p>
                                            <p className="text-center px-5">Chúng tôi đang chuyển đổi hoạt động từ thiện thông qua sức mạnh của công nghệ blockchain.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Thành tựu của chúng tôi */}
                        <div className={clsx(Style.activityDashboard)}>
                            <div className="container">
                                <div className="text-center">

                                    <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Thành tựu của chúng tôi</p>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-lg-4 py-4">
                                        <p className="fs-1 text-center fw-bold">{utils.formatNumber(dashboardReport.amountDonated)}</p>
                                        <p className="m-0 text-center">~ {utils.formatNumber(Number(dashboardReport.amountDonated.slice(0, dashboardReport.amountDonated.length - 4)) * trxPrice)} VNĐ</p>
                                        <p className="text-center fst-italic fs-5">Số tiền đã kêu gọi</p>
                                    </div>
                                    <div className="col-12 col-lg-4 py-4">
                                        <p className="fs-1 text-center fw-bold">{utils.formatNumber(dashboardReport.projectCreated)}</p>
                                        <p className="fs-5 m-0 text-center">-</p>
                                        <p className="text-center fst-italic fs-5">Số dự án đã lập</p>
                                    </div>
                                    <div className="col-12 col-lg-4 py-4">
                                        <p className="fs-1 text-center fw-bold">{utils.formatNumber(dashboardReport.donated)}</p>
                                        <p className="fs-5 m-0 text-center">-</p>
                                        <p className="text-center fst-italic fs-5">Số lượt đóng góp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bắt đầu  */}
                        <div className={clsx(Style.startDashboard)}>
                            <div className="container">
                                <div className="text-center">

                                    <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Bắt đầu</p>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="d-flex flex-column">
                                            <img src={donate} width="150px" alt="" className="mx-auto" />
                                            <p className="text-center fs-4 fw-bold">Đóng góp</p>
                                            <p className="text-center">Khám phá các dự án để đóng góp trên toàn lãnh thổ Việt Nam.</p>
                                            <Link to="/project" onClick={() => window.scrollTo(0, 0)} className="fs-4 text-center text-decoration-none bg-base-color text-light p-2 w-50 mx-auto rounded-3" >Xem các dự án</Link>
                                        </div>
                                        {/* <div className={clsx(Style.introItem, 'shadow overflow-hidden d-flex flex-column')}>
                                <img src={introBanner} alt="intro banner" className="img-fluid " />
                            </div> */}
                                    </div>
                                    <div className="col-12 col-md-6 mt-5 mt-md-0">
                                        <div className="d-flex flex-column">
                                            <img src={createProject} width="150px" alt="" className="mx-auto" />
                                            <p className="text-center fs-4 fw-bold">Lập dự án</p>
                                            <p className="text-center">Các cá nhân, tổ chức phi lợi nhuận sẵn sàng gây quỹ có thể bắt đầu lập dự án.</p>
                                            <Link to="/add-project" onClick={() => window.scrollTo(0, 0)} className="fs-4 text-center text-decoration-none bg-base-color text-light p-2 w-50 mx-auto rounded-3" >Lập dự án</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Các dự án đã hoàn thành*/}
                        <div className={clsx(Style.projectDashboard)}>
                            <div className="container">
                                <div className="text-center">
                                    <p className={clsx(Style.title, "d-inline-block  fs-2 fw-bold position-relative")}>Các dự án đang thực thi</p>
                                </div>
                                <div className="row">

                                    {
                                        projectList.map((item, index) => (
                                            <div key={index} className={clsx(Style.projectItem, 'col-12  col-md-6 col-xxl-4 p-3 p-md-4')}>
                                                <div className={clsx(Style.projectWrapItem, "overflow-hidden shadow d-flex flex-column")}>
                                                    <div className="w-100 ">
                                                        <img src={process.env.REACT_APP_URL + item.bannerPath}
                                                            onError={(e) => (e.target.onerror = null, e.target.src = charityBanner)}
                                                            className={clsx(Style.imgCard)} alt="hình ảnh dự án" />
                                                    </div>
                                                    <div className="p-3 d-flex flex-column flex-grow-1 justify-content-around " >
                                                        <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.titleProject, "  my-2 text-decoration-none text-uppercase fs-5 fw-bold text-dark")}>{item.title}</Link>
                                                        <div className={clsx(Style.shortDescription)}>
                                                            <SetInnerHTML text={item.shortDescription} />
                                                        </div>
                                                        <div className="mt-4">

                                                            <div className="ProgressBarContent px-3 my-2  bg-light rounded-3">
                                                                <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                                                <ProgressBar striped now={Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100) + 10} label={`${Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100)} %`} />
                                                                <span>{utils.formatNumber((Number(item.amountNow) * trxPrice).toFixed(2))} / {utils.formatNumber(item.amountNeed)} VNĐ</span>
                                                            </div>
                                                            <div className="border-start px-3 py-1 my-2 d-flex flex-column ">
                                                                <span ><i className="mdi mdi-history fs-5 pe-2"></i>Trạng thái</span>
                                                                <span className={clsx(Style.baseColor, 'text-uppercase')}>{item.status === 1 ? "Đang chờ duyệt" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</span>
                                                            </div>
                                                            <div className='d-flex flex-column flex-xl-row align-items-center  justify-content-between '>
                                                                <div className="d-flex align-items-center ">
                                                                    <span><i className="mdi mdi-account-multiple-outline fs-5 me-1 "></i></span>
                                                                    <p className='text-decoration-none m-0 '>{item.userCreate}</p>
                                                                </div>
                                                                <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted text-decoration-none bg-white px-4 py-2 fw-bold')}>Xem chi tiết</Link>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>

                            </div>
                        </div>

                        {/* Tin tức */}
                        <div className={clsx(Style.newsDashboard)}>
                            <div className="container">
                                <div className="text-center">

                                    <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Tin tức</p>
                                </div>
                                <div className="row">
                                    <div className="col-12 py-4">

                                        <Slider {...settingSliderNews}>
                                            {
                                                newsList.map((item, index) => (
                                                    <div key={index} className={clsx(Style.articalDetail, " p-4 ")}>
                                                        <div className={clsx(Style.articalDetailWrap, 'position-relative p-3 rounded-3 shadow')}>

                                                            <div className={clsx(Style.header)}>
                                                                <img src={process.env.REACT_APP_URL + item.bannerPath} alt="hình ảnh bài viết" className="" />
                                                            </div>

                                                            <div className={clsx(Style.body, ' px-3 py-4')}>
                                                                <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => window.scrollTo(0, 0)} className='text-decoration-none '>
                                                                    <h4 className="fs-4 text-center text-uppercase">{item.title}</h4>

                                                                </Link>

                                                                <div className="d-flex justify-content-between my-4">

                                                                    <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-1"></i>{item.createUser}</p>
                                                                    <p className='m-0 fst-italic'>{moment(item.createTime).format("DD/MM/YYYY")}<i className="mdi mdi-calendar-check ms-1"></i></p>
                                                                </div>
                                                                <div className={clsx(Style.bodyDesc)}>
                                                                    <SetInnerHTML text={item.content} />
                                                                </div>
                                                            </div>
                                                            <div className={clsx(Style.footer)}>
                                                                <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => window.scrollTo(0, 0)} className='text-decoration-none '>Xem chi tiết<i className="mdi mdi-arrow-right-bold-circle-outline ms-2"></i></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>

                )
            }
        </>
    );
}

export default DashboardClient;