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
import * as utils from '../../../utils/utils.js';

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
            title: "CÔNG TY GRANT THORNTON TẶNG QUÀ TẾT CHO TRẺ EM BỊ ẢNH HƯỞNG BỞI DỊCH COVID-19 TẠI QUẬN 4",
            content: "<p>Ngày 23/1, Quỹ Bông Sen cùng với Công ty TNHH Grant Thornton (GT) đã có buổi trao quà Tết cho 150 em bị ảnh hưởng bởi dịch Covid-19 vừa qua tại Quận 4. Những gói quà nhỏ như là lời động viên, đồng hành từ GT đến các em đang chịu những mất mác to lớn, một cái Tết có lẽ sẽ quạnh hiu hơn khi thiếu vắng đi người đã từng chăm lo cho các bé từng bữa ăn giấc ngủ.</p><p>Mỗi em đã nhận được 1 phần quà Tết trị giá 500.000 đồng. Bên cạnh đó, có 12 em có hoàn cảnh đặc biệt hơn sẽ nhận thêm 1 suất hiện kim trị giá 1.000.000 đồng. Tổng giá trị đợt hỗ trợ: 87.000.000 đồng từ Công ty TNHH Grant Thornton.</p>",
            createTime: "2021-08-10T00:00:00.000Z",
            createUser: "Nguyễn Minh Hiếu",
            filePath: "https://quybongsen.org/wp-content/uploads/2022/01/z3134282572272_844ade5e44735238028d53067476d551-300x225.jpg"
        },
        {
            id: 115,
            proj_id: 91,
            title: "Chung tay ủng hộ quỹ xây trường cho học sinh miền núi: Vì những mái trường không dột nát",
            content: "<p>Dịch COVID -19 dần được kiểm soát, học sinh đã dần trở lại mái trường thân yêu, với thầy cô và bạn bè. Nhưng, bên cạnh những ngôi trường khang trang với trang thiết bị hiện đại, vẫn còn đâu đó không ít mái trường liêu xiêu, mái bị gió biển thổi đi muôn nơi. Hay vào mùa mưa, trên những rẻo cao miền sơn cước, có hình ảnh cô trò lấy thau ra hứng nước trong lớp học, bụi phấn chẳng rơi được trên bục giảng vì bảng đen thấm nước. Và còn đâu đó, hình ảnh cả thầy lẫn trò ngồi co ro trong lớp học ghép bằng ván gỗ, gió mùa về khiến sống mũi “ Người lái đò” cay cay vì thương mái trường nghèo, chẳng đỡ nổi nắng, mưa. Thấu hiểu nỗi lòng của thầy, trò ở vùng khó khăn, BTC Ngày Thẻ Việt Nam lần thứ 2 năm 2022 do báo Tiền Phong tổ chức kêu gọi những tấm lòng hảo tâm vàng, chung tay quyên góp kinh phí để sửa chữa phòng học đã xuống cấp, trang bị máy tính phục vụ học sinh học tập cho các trường khu vực miền núi đặc biệt khó khăn, khu vực biên giới hải đảo và khu vực bị ảnh hưởng nặng nề bởi thiên tai lũ lụt. </p>",
            createTime: "2021-10-12T00:00:00.000Z",
            createUser: "Huỳnh Văn Thảo",
            filePath: "https://static.thiennguyen.app/public/news/photo/2022/4/17/536a4203-6857-4089-ab04-c350b090b704.jpg"
        },
        {
            id: 117,
            proj_id: 91,
            title: "Cá nhân kêu gọi làm từ thiện: có lòng tốt thôi là chưa đủ!",
            content: "<p>Từ thiện là nghĩa cử cao đẹp cần được lan tỏa sâu rộng. Có thể thấy, trước những ảnh hưởng sâu sắc của COVID-19, nhiều cá nhân có lòng hảo tâm đã đứng ra kêu gọi, kết nối cộng đồng để có thể chung tay hỗ trợ những hoàn cảnh khó khăn, người sống trong vùng cách ly, phong tỏa và cả những lực lượng tuyến đầu. Song, chính bởi những hoạt động đôi khi mang tính tự phát nên phần nào vẫn còn nhiều thiếu sót dẫn đến làm mất đi lòng tin, mất đi bản chất tốt đẹp của từ thiện.</p> <p>Có thể thấy, trong thời gian gần đây nhiều hoạt động kêu gọi từ thiện của các cá nhân, trong đó bao gồm những nghệ sĩ có tên tuổi chỉ vì thiếu minh bạch và chưa chuyên nghiệp trong khâu tổ chức đã tạo nên những tranh luận, làm ảnh hưởng đi hình ảnh tốt đẹp vốn có của hoạt động xã hội này. Thậm chí, điều này càng vô hình tạo ra những áp lực cho những nhà hảo tâm nhưng ngại va vào những ngờ vực tương tự.</p>",
            createTime: "2021-11-10T00:00:00.000Z",
            createUser: "Trần Văn Thuận",
            filePath: "https://cdn.tuoitre.vn/thumb_w/586/2021/11/26/photo-1-1637919462277776477331.jpg"
        },
        {
            id: 119,
            proj_id: 91,
            title: "CẬP NHẬT CHƯƠNG TRÌNH 5,000 PHẦN QUÀ CHO NGƯỜI LAO ĐỘNG KHU CÁCH LY (ĐỢT 1)",
            content: "<p>Sài Gòn những ngày tháng 7 nắng gay gắt, lưng áo NHỮNG NGƯỜI TRUNG CHUYỂN thấm đẫm mồ hôi, đi vào khu vực dịch bệnh đang diễn biến phức tạp và phần lớn chúng tôi vẫn chưa được tiêm Vacxin, nhưng trên cả những mệt mỏi và lo lắng, chúng tôi thấy hạnh phúc vô cùng. Hành trình mang 5000 phần quà đến người lao động trong các khu cách ly sẽ tiếp tục…</p>",
            createTime: "2021-10-20T00:00:00.000Z",
            createUser: "Lê Bảo Anh",
            filePath: "https://quybongsen.org/wp-content/uploads/2021/06/211957658_4470326246334323_9094743780909748511_n.jpg"
        },
        {
            id: 121,
            proj_id: 91,
            title: "NHỮNG SUẤT CƠM ẤM TÌNH MÙA DỊCH",
            content: "<p>Những ngày qua khúc ca tình nguyện của Quỹ Bông Sen lại vang lên khi tất cả các Quán Nụ Cười tại HCM đều hoạt động trở lại. Các quán Nụ Cười 1,2,4,6,7,8 và 9 cùng Quán Yên Vui Nghệ An, Gia Lai, Quảng Trị, Đà Nẵng, Cần Thơ, An Giang đều bán lại. Các quán Yên Vui cũng cố gắng không ngừng hỗ trợ cho người dân đang mưu sinh. Rất nhiều quán tổ chức cho tình nguyện viên mang cơm đi phát cho người phải mưu sinh, người khó khăn trong dịch bệnh.</p>",
            createTime: "2022-01-20T00:00:00.000Z",
            createUser: "Huỳnh Khang",
            filePath: "https://quybongsen.org/wp-content/uploads/2021/06/191000223_4102555249824894_179774710688888086_n.jpg"
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
                            <p className="fs-1 text-center fw-bold">{utils.formatNumber(5350000)} TRX</p>
                            <p className="m-0 text-center">~ {utils.formatNumber(Number(5350000) * trxPrice)} VNĐ</p>
                            <p className="text-center fst-italic fs-5">Số tiền đã kêu gọi</p>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <p className="fs-1 text-center fw-bold">{utils.formatNumber(350)}</p>
                            <p className="fs-5 m-0 text-center">-</p>
                            <p className="text-center fst-italic fs-5">Số dự án đã lập</p>
                        </div>
                        <div className="col-12 col-lg-4 py-4">
                            <p className="fs-1 text-center fw-bold">{utils.formatNumber(2167)}</p>
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
                            projectList.map((item, index) => (

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
                                                <span>{utils.formatNumber((Number(item.amountNow) * trxPrice).toFixed(2))} / {utils.formatNumber(item.amountNeed)} VNĐ</span>
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