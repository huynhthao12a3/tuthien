import React from 'react';
import PropTypes from 'prop-types';
import dashboardBanner from '../../../assets/images/dashboard_banner.jpg'
import introItem from '../../../assets/images/intro_item.png'
import introBanner from '../../../assets/images/intro_banner.png'
import banner from '../../../assets/images/banner.png'
import banner1 from '../../../assets/images/banner1.jpg'
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
// Slider trong React Slick
import Slider from "react-slick";
// Thư viện xử lý ngày tháng 
import moment from 'moment'
DashboardClient.propTypes = {

};

function DashboardClient(props) {
    // Data bài viết từ API 
    const fakeDateArtical = [
        {
            id: 114,
            proj_id: 91,
            title: "Xe cứu thương này trông nhỏ nhưng bên trong có rất nhiều!",
            content: "<p>Gửi các nhà tài trợ, cảm ơn bạn rất nhiều vì những món quà hào phóng của bạn đối với...</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-08-10T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://hadoantv.com/wp-content/uploads/2021/06/download-POLICE-SIMULATOR-PATROL-OFFICERS-hadoan-tv.jpg"
        },
        {
            id: 115,
            proj_id: 91,
            title: "Vẫn bị kẹt trong cổng!",
            content: "<p>Các nhà tài trợ thân mến, chúng tôi hy vọng sẽ có thêm tin tức cho bạn vào lúc này, nhưng thật đáng tiếc là hiện tại xe cấp cứu vẫn đang mắc kẹt ở Mombasa, cảng nơi nó được dỡ hàng, cách bệnh viện 650 dặm. Đại lý nhập khẩu cho biết nó có vấn đề về máy móc, đây là một điều bất ngờ đối với chúng tôi. Chúng tôi có thể sẽ cần cử ai đó đến Mombasa để phân loại nó.</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-10-12T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://wp-mktg.prod.getty1.net/istockcontentredesign/wp-content/uploads/sites/5/bfi_thumb/2021_Composite_2304x1274_hero.jpg-37i4184kuwatssx9bxo96d6at0qnxmhzifjt0wa2iz0qmzinw.jpeg"
        },
        {
            id: 117,
            proj_id: 91,
            title: "Những gì chúng tôi hiện đang làm, không có xe cứu thương!",
            content: "<p>Một lần nữa, xin cảm ơn các bạn đã đóng góp cho buổi quyên góp xe cứu thương! </p> <p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-11-10T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://helpx.adobe.com/content/dam/help/en/photoshop/how-to/compositing/jcr%3Acontent/main-pars/image/compositing_1408x792.jpg"
        },
        {
            id: 119,
            proj_id: 91,
            title: "Xe cứu thương!",
            content: "<p>Một lần nữa, xin cảm ơn các bạn đã đóng góp cho buổi quyên góp xe cứu thương!</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-10-20T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://hadoantv.com/wp-content/uploads/2021/06/download-POLICE-SIMULATOR-PATROL-OFFICERS-hadoan-tv.jpg"
        },
        {
            id: 121,
            proj_id: 91,
            title: "Đọc bản cập nhật cuối cùng của chúng tôi!",
            content: "<p>Xe cứu thương hiện đã kết thúc hành trình đường biển từ Dubai đến Mombasa, cảng chính của Kenya. Chúng tôi đang sắp xếp để ai đó thu thập nó và mang nó đến bệnh viện ở Uganda, vì vậy chúng tôi sẽ có thêm...</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2022-01-20T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://www.eye-image.nl/assets/files/eye-image-homepage.1920x0x0x100.jpg"
        },
    ]
    // Lấy giá TRX
    const [trxPrice, setTrxPrice] = useState();
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
            .then(res => res.json())
            .then(res => { setTrxPrice(res.tron.vnd) })
    }, [])


    const [projectList, setProjectList] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    // Lấy danh sách project
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
        fetchDataProjectList()
    }, [])


    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

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
                isLoading ? <Loading /> : ""
            }
            {/* Phần Banner */}
            <div className={clsx(Style.dashboardBanner, 'px-3')}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <p className="fs-3 lh-base text-white fst-italic " >
                                "Với nhiều hoạt động lớn có ý nghĩa xã hội và nhân văn trên cả nước, Tấm Lòng Vàng đã và đang nỗ lực hết sức để hoàn thành sứ mệnh của mình, trở thành một điển hình cho tinh thần tương thân tương ái của người Việt."</p>
                        </div>
                    </div>
                </div>

            </div >

            {/* Phần đầu  */}
            <div className={clsx(Style.headerDashboard)} >
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-12 col-md-6 mx-auto">
                            <h1 className="text-center fs-1 lh-base">Giải pháp công nghệ đồng hành cùng hoạt động từ thiện minh bạch</h1>
                        </div>
                    </div>


                </div>
                <div className="container mt-5">
                    <div className="row mb-3 mb-lg-5">
                        <div className="col-12  p-3 p-md-4">
                            <div className={clsx(Style.introItem, 'shadow overflow-hidden d-flex flex-column flex-lg-row')}>
                                <img src={banner} alt="" />
                                <div className="content p-4">
                                    <h2 className="fs-2 lh-base ">Minh bạch cho người lập dự án</h2>
                                    <p className="fs-4 ">Giúp tự động thống kê và công khai 24/7 mọi số tiền nhận ủng hộ và chi hỗ trợ thông qua địa chỉ ví.</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-12  p-3 p-md-4">
                            <div className={clsx(Style.introItem, 'shadow overflow-hidden d-flex flex-column flex-lg-row')}>
                                <div className="content p-4 order-2 order-md-1">
                                    <h2 className="fs-2 lh-base ">Niềm tin cho người đóng góp</h2>
                                    <p className="fs-4 ">Giúp thuận tiện theo dõi thông tin tài chính các chiến dịch thiện nguyện mà mình quan tâm hay dễ dàng tương tác, hỗ trợ kịp thời cho người gây quỹ.</p>
                                </div>
                                <img src={banner1} alt="" className="order-1 order-md-2" />
                            </div>

                        </div>



                    </div>
                </div>
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

            {/* Hoạt động của chúng tôi */}
            <div className={clsx(Style.activityDashboard)}>
                <div className="container">
                    <div className="text-center">

                        <p className={clsx(Style.title, "d-inline-block fs-2 fw-bold position-relative")}>Thành tựu của chúng tôi</p>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-4 py-4">
                            <p className="fs-1 text-center fw-bold">{formatNumber(5350000)} TRX</p>
                            <p className="m-0 text-center">~ {formatNumber(Number(5350000) * trxPrice)} VNĐ</p>
                            <p className="text-center fst-italic fs-5">Số tiền đã kêu gọi</p>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <p className="fs-1 text-center fw-bold">{formatNumber(350)}</p>
                            <p className="fs-5 m-0 text-center">-</p>
                            <p className="text-center fst-italic fs-5">Số dự án đã lập</p>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <p className="fs-1 text-center fw-bold">{formatNumber(2167)}</p>
                            <p className="fs-5 m-0 text-center">-</p>
                            <p className="text-center fst-italic fs-5">Số lượt đóng góp</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các dự án đã hoàn thành*/}
            <div className={clsx(Style.projectDashboard)}>
                <div className="container">
                    <div className="text-center">
                        <p className={clsx(Style.title, "d-inline-block  fs-2 fw-bold position-relative")}>Các dự án đã hoàn thành</p>
                    </div>
                    <div className="row">

                        {
                            projectList.filter((item, index) => {
                                if (index !== 9) {
                                    return item
                                }
                            }).map((item, index) => (

                                <div key={index} className={clsx(Style.projectItem, 'col-12  col-md-6 col-xxl-4 p-3 p-md-4')}>
                                    <div className={clsx(Style.projectWrapItem, "overflow-hidden shadow d-flex flex-column")}>
                                        <div className="w-100 ">
                                            <img src={process.env.REACT_APP_URL + item.bannerPath}
                                                onError={(e) => (e.target.onerror = null, e.target.src = charityBanner)}
                                                className={clsx(Style.imgCard)} alt="hình ảnh dự án" />
                                        </div>
                                        <div className="p-3 d-flex flex-column flex-grow-1 justify-content-evenly " >
                                            <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.titleProject, " d-block my-4 text-decoration-none text-uppercase fs-5 fw-bold text-dark")}>{item.title}</Link>
                                            <div className={clsx(Style.shortDescription)}>
                                                <SetInnerHTML text={item.shortDescription} />
                                            </div>
                                            <div className="ProgressBarContent px-3 my-4  bg-light rounded-3">
                                                <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                                <ProgressBar striped now={Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100) + 10} label={`${Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100)} %`} />
                                                <span>{formatNumber((Number(item.amountNow) * trxPrice).toFixed(2))} / {formatNumber(item.amountNeed)} VNĐ</span>
                                            </div>
                                            <div className="border-start px-3 py-1 my-3 d-flex flex-column ">
                                                <span ><i className="mdi mdi-history fs-5 pe-2"></i>Trạng thái</span>
                                                <span className={clsx(Style.baseColor, 'text-uppercase')}>{item.status === 1 ? "Đang chờ duyệt" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</span>
                                            </div>
                                            <div className='d-flex flex-column flex-xl-row align-items-center  justify-content-between '>
                                                <div className="d-flex align-items-center ">
                                                    <span><i className="mdi mdi-account-multiple-outline fs-5 me-1 pe-2"></i></span>
                                                    <p className='text-decoration-none m-0 text-uppercase'>{item.userCreate}</p>
                                                </div>
                                                <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted text-decoration-none bg-white px-4 py-2 fw-bold')}>Xem chi tiết</Link>
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
                                    fakeDateArtical.map((item, index) => (
                                        <div key={index} className={clsx(Style.articalDetail, " p-4 ")}>
                                            <div className={clsx(Style.articalDetailWrap, 'position-relative p-3 rounded-3 shadow')}>

                                                <div className={clsx(Style.header)}>
                                                    <img src={item.filePath} alt="hình ảnh bài viết" className="" />
                                                </div>

                                                <div className={clsx(Style.body, ' px-3 py-4')}>
                                                    <a href="./chi-tiet-bai-viet" className='text-decoration-none'>
                                                        <h4 className="fs-4 text-center text-uppercase">{item.title}</h4>
                                                    </a>
                                                    <div className="d-flex justify-content-between my-4">

                                                        <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-1"></i>{item.createUser}</p>
                                                        <p className='m-0 fst-italic'>{moment(item.createTime).format("DD/MM/YYYY")}<i className="mdi mdi-calendar-check ms-1"></i></p>
                                                    </div>
                                                    <div className={clsx(Style.bodyDesc)}>
                                                        <SetInnerHTML text={item.content} />
                                                    </div>
                                                </div>
                                                <div className={clsx(Style.footer)}>
                                                    <Link to={{ pathname: '/bai-viet/' + item.id + '/' + item.title }} onClick={() => window.scrollTo(0, 0)} className='text-decoration-none '>Xem chi tiết<i className="mdi mdi-arrow-right-bold-circle-outline ms-2"></i></Link>
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
    );
}

export default DashboardClient;