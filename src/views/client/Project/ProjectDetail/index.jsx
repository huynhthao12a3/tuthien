import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import clsx from "clsx";
import Style from "./ProjectDetail.module.scss"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import trxCoin from "../../../../assets/images/trx-coin.svg"
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
// Dùng chung
import SetInnerHTML from "../../../../shares/setInnerHTML"
//  Google map 
import Iframe from 'react-iframe'

// Sanitize chỗi html từ ckEditor  
import DOMPurify from 'dompurify';
// Zoom hình ảnh 
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// Thư viện xử lý ngày tháng 
import moment from 'moment'

// Slider trong React Slick
import Slider from "react-slick";

// Sweet Alert  
import swal2 from 'sweetalert2'
import { useHistory, useLocation } from 'react-router-dom'
import AddProject from "../Add/index";
import projectApi from '../../../../api/Project';
import clientUser from '../../../../api/User/Client';
import logoCharity from '../../../../assets/images/default-avatar.jpg'
ProjectDetail.propTypes = {

};

function ProjectDetail(props) {
    const locations = useLocation().pathname

    const [dataProject, setDataProject] = useState({
        userCreateId: 1,
        title: "Hỗ trợ lũ lụt đồng bào miền trung",
        shortDescription: "<p>Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p>",
        addressContract: null,
        category: [
            "Trẻ em",
            "Khí hậu",
            "Khắc phục thiên tai",
            "Sức khỏe"
        ],
        userCreate: "huỳnh thảo",
        createTime: "0001-01-01T00:00:00",
        amountNow: 0,
        amountNeed: 10000000,
        status: 1,
        summary: "<p>Đảm bảo các gia1 đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
        problemToAddress: "<p>Đảm bảo 2các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
        solution: "<p>Đảm bảo các gia đì3nh dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
        location: "thành phố bà rịa - vũng tàu, việt nam",
        impact: "500 người dân",
        endDate: "2022-09-11T09:12:22.737",
        userType: 0,
        bannerPath: "\\uploads\\Images\\project\\12042022_024329_quyengop.png",
        processes: [
            {
                processId: 6,
                title: "process 1",
                status: 1,
                shortDescription: "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p>",
                content: "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p><p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p>",
                listImages: [],
                expenses: []
            },
            {
                processId: 7,
                title: "process 2",
                status: 1,
                shortDescription: "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p>",
                content: "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p><p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19... Để cung cấp phương tiện di chuyển cứu người cho bà mẹ và trẻ em, ở một đất nước mà xe cứu thương vẫn còn hiếm.</p>",
                listImages: [],
                expenses: []
            }
        ],
        files: null,
        articals: null,
        transaction: []
    })
    const { id, friendlyUrl } = useParams()
    console.log(id)
    useEffect(() => {
        const fetchDataProject = async () => {
            const response = await projectApi.get(id)
            setDataProject(response.data)
            console.log('project :', response.data)
        }
        fetchDataProject()
    }, [id])

    // Hàm format string thành number
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    // URL map location
    const urlLocation = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDEhyx111_aA4TIk0BPHGyLTOZnIFChjGc&q=" + dataProject.location.replaceAll(' ', '+');

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



    // Setting slider 
    const settingSliderArtical = {
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

    const settingSliderDonors = {
        dots: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    // API giá TRX
    const [valueTrx, setValueTrx] = useState(1);
    const [trxPrice, setTrxPrice] = useState();
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
            .then(res => res.json())
            .then(res => { setTrxPrice(res.tron.vnd) })
    }, [])

    // useEffect(() => {

    //     const fetchApi = async () => {
    //         const response = await projectApi.getAll()
    //         console.log(response)
    //     }
    //     fetchApi()
    // }, [])
    console.log("URL: ", process.env.REACT_APP_API_URL)
    // console.log(trxPrice)


    // const [statusTronWeb, setStatusTronWeb] = useState({
    //     installed: !!window.tronWeb,
    //     loggedIn: window.tronWeb && window.tronWeb.ready
    // })
    // console.log(statusTronWeb)
    const tronweb = window.tronWeb;
    // const HttpProvider = tronweb.providers.HttpProvider;
    // tronweb.eventServer = new HttpProvider("https://nile.trongrid.io")

    // ------------------------------------------------------------------- DONATE 
    // Hàm xử lý đóng góp cho dự án
    const handleDonate = () => {
        if (!!window.tronWeb == false) {
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng cài đặt TronLink để tham gia đóng góp.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else if ((window.tronWeb.ready && window.tronWeb.ready) == false) {
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập TronLink để tham gia đóng góp.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else {
            donate()
        }

    }

    // Gọi hàm Donate từ Smart Contract
    async function donate() {
        try {
            const sm = await tronweb.contract().at(dataProject.addressContract)

            const adminInfo = localStorage.getItem('admin-info') ? JSON.parse(localStorage.getItem('admin-info')) : null
            const clientInfo = localStorage.getItem('client-info') ? JSON.parse(localStorage.getItem('client-info')) : null
            const userInfo = adminInfo != null ? adminInfo : clientInfo
            // console.log('email : ', email)
            const result = await sm.DonateProject(valueTrx * 1000000, userInfo.email).send({
                feeLimit: 100_000_000,
                callValue: valueTrx * 1000000,
                // shouldPollResponse:true
            })
                .then((res) => {
                    console.log('Donate: ', res)
                    console.log('Type of res: ', typeof res)

                    if (typeof res === 'string') {
                        swal2.fire({
                            title: "Xác nhận đóng góp.",
                            text: "Đóng góp của bạn sẽ được cập nhật trong giây lát.",
                            icon: "success",
                            confirmButtonColor: 'var(--love-color-1)'

                        });

                        const checkConfirmTransaction = setInterval(async () => {
                            console.log("chạy 1 lần")
                            console.log("data: ", res)
                            await tronweb.trx.getUnconfirmedTransactionInfo(res)
                                .then((response) => {
                                    if (response.receipt) {
                                        if (response.receipt.result === "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            console.log("Giao dịch thành công. Lưu vào database.")
                                            saveTransactionDonate(res)
                                            swal2.fire({
                                                title: "Đóng góp thành công.",
                                                html: "Đóng góp của bạn đã được xác nhận thành công. </br> Chúng tôi chân thành cảm ơn bạn. </br> Chúc bạn luôn mạnh khỏe và thành công trong cuộc sống.</br> "
                                                    + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" }>Chi tiết giao dịch</a>`,
                                                icon: "success",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                        if (response.receipt.result !== "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            console.log("FAIL - clearInterval")
                                            swal2.fire({
                                                title: "Đóng góp không thành công.",
                                                html: "Giao dịch thất bại. Vui lòng kiểm tra số dư ví.</br>"
                                                    + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" }>Chi tiết giao dịch</a>`,
                                                icon: "error",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                    }
                                })
                        }, 1000)
                    }
                })


        }
        catch (err) {
            console.error(err);
            swal2.fire({
                title: "Đóng góp không thành công",
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }


    // Lưu giao dịch donate thành công vào database
    const saveTransactionDonate = async (hash) => {
        const data = {
            id: id,
            amount: valueTrx * trxPrice,
            hash: hash,
        }
        const response = await clientUser.donateProject(data)
        console.log('Đã lưu donate vào database: ', response.data)
    }

    // ---------------------------------------------------------------- WITHDRAW
    // Hàm xử lý rút tiền 
    const handleWithdraw = () => {
        if (!!window.tronWeb === false) {
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng cài đặt TronLink để rút tiền.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập TronLink để rút tiền.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else {
            withdraw()
        }
    }

    // Hàm rút tiền từ Smart contract
    async function withdraw() {

        try {
            const sm = await tronweb.contract().at(dataProject.addressContract)
            const result = await sm.WithDraw(tronweb.defaultAddress.base58, valueTrx * 1000000).send({
                feeLimit: 100_000_000,
                callValue: valueTrx * 1000000,
                // shouldPollResponse:true
            })
                .then((res) => {
                    console.log('Withdraw: ', res)

                    if (typeof res === 'string') {
                        swal2.fire({
                            title: "Xác nhận rút tiền.",
                            text: "Yêu cầu rút tiền của bạn sẽ được cập nhật trong giây lát.",
                            icon: "success",
                            confirmButtonColor: 'var(--love-color-1)'

                        });

                        const checkConfirmTransaction = setInterval(async () => {
                            console.log("chạy 1 lần")
                            console.log("data: ", res)
                            await tronweb.trx.getUnconfirmedTransactionInfo(res)
                                .then((response) => {
                                    if (response.receipt) {
                                        if (response.receipt.result === "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            console.log("Rút tiền thành công. Lưu vào database.")
                                            saveTransactionWithdraw(res)
                                            swal2.fire({
                                                title: "Rút tiền thành công.",
                                                html: "Yêu cầu rút tiền của bạn đã được xác nhận thành công.</br>"
                                                    + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" }>Chi tiết giao dịch</a>`,
                                                icon: "success",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                        if (response.receipt.result !== "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            console.log("FAIL - clearInterval")
                                            swal2.fire({
                                                title: "Rút tiền không thành công.",
                                                html: `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" }>Chi tiết giao dịch</a>`,
                                                icon: "error",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                    }
                                })
                        }, 1000)
                    }
                })
        }
        catch (err) {
            console.error(err);
            swal2.fire({
                title: "Rút tiền không thành công",
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    // Lưu giao dịch withdraw thành công vào database
    const saveTransactionWithdraw = async (hash) => {
        const data = {
            id: id,
            amount: valueTrx * trxPrice,
            hash: hash,
        }
        const response = await clientUser.widthdrawProject(data)
        console.log('Đã lưu withdraw vào database: ', response.data)
    }
    return (
        <>
            {/* Header dự án  */}
            <div className={clsx(Style.headerProject, 'py-5 ')} >
                <div className="container d-flex justify-content-between">
                    <div className="row">

                        <div className="col-12 col-lg-4 d-flex align-items-center">
                            <div className="row text-center ">

                                <div className="col-12">
                                    <img className="img-fluid" src={process.env.REACT_APP_URL + dataProject.bannerPath} alt="project img" />
                                </div>
                                <div className=" col-12">
                                    {
                                        dataProject.category.map((item, index) =>
                                            <span key={"project" + index} className="d-inline-block me-1 me-md-4 ">

                                                <i className={clsx(Style.baseColor, 'mdi mdi-label-outline pe-1 pe-md-2')}></i>
                                                {item.categoryName}
                                            </span>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-lg-7 offset-lg-1">
                            <div className={clsx(Style.baseColor, 'd-flex align-items-center my-3 my-lg-0')}>
                                <i className="mdi mdi-account-multiple-outline fs-1 me-3 pe-2 border-end"></i>
                                <div className="">
                                    <p className=" mb-0 py-1">{dataProject.userType === 0 ? 'Cá nhân' : 'Tổ chức'}</p>
                                    <Link to={`/profile/${dataProject.userCreateId}`} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, 'text-uppercase text-decoration-none')}>{dataProject.userCreate}</Link>
                                </div>
                            </div>

                            <h1 className="py-3">{dataProject.title}</h1>
                            <SetInnerHTML text={dataProject.shortDescription} />

                            <div className="ProgressBarContent my-3">
                                <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                <ProgressBar striped now={Math.floor((Number(dataProject.amountNow) / Number(dataProject.amountNeed)) * 100)} label={`${Math.floor((Number(dataProject.amountNow) / Number(dataProject.amountNeed)) * 100)} %`} />
                                <span>{formatNumber(dataProject.amountNow)} / {formatNumber(dataProject.amountNeed)} VNĐ</span>
                            </div>
                            <Button className={clsx(Style.backgroundForeignColor, 'px-5 my-2 w-100 text-light border-0')}><i className='mdi mdi-heart-outline me-1'></i>Theo dõi</Button>


                            <div className={clsx(Style.baseColor, 'd-flex flex-column flex-md-row justify-content-between align-items-center my-3')}>
                                <div className="border-start px-3 d-flex flex-column align-self-start">
                                    <span className="text-white"><i className="mdi mdi-history pe-2"></i>Trạng thái</span>
                                    <span className={clsx(Style.baseColor, 'text-uppercase')}>{dataProject.status === 1 ? "Đang chờ duyệt" : (dataProject.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</span>
                                </div>
                                {
                                    dataProject.isEdit === true ? (
                                        <Link to={{
                                            pathname: `/update-project/${id}/${dataProject.title}`,
                                            state: locations // chuyền dữ liệu qua Update-process

                                        }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} >
                                            <i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa dự án</Link>

                                    ) : null
                                }

                            </div>
                            {/* <Button className={clsx(Style.backgroundForeignColor, 'px-5 text-light border-0 w-100 fw-bold')}><i className='mdi mdi-currency-btc me-1'></i>Quyên góp</Button> */}

                        </div>

                    </div>
                </div>
            </div >

            {/* Thanh menu chi tiết dự án  */}
            <div className={clsx(Style.projectDetailMenu)} >
                <div className="container">
                    <div className="d-flex justify-content-around flex-wrap">
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#overview">Giới thiệu</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#process">Tiến trình dự án</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#artical">Cập nhật mới nhất</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#donors">Người đóng góp</a>
                    </div>
                </div>
            </div >

            {/* Tổng quan dự án  */}
            <div id="overview" className="py-5 " >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2>Giới thiệu về dự án</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                            <div className='my-5' >
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-format-page-break me-3'></i>Tổng quan</h3>
                                <SetInnerHTML text={dataProject.summary} />
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-alert-outline me-3'></i>Vấn đề cần giải quyết</h3>
                                <SetInnerHTML text={dataProject.problemToAddress} />
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-lightbulb-on-outline me-3'></i>Giải pháp</h3>
                                <SetInnerHTML text={dataProject.solution} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 offset-lg-1 ">

                            {/* Google map & chi tiết dự án */}
                            <Iframe url={urlLocation}
                                width="100%"
                                height="400px"
                                display="initial"
                                position="relative"
                                allow="fullscreen" />
                            <div className=' border p-4 bg-light'>
                                <h4 className='fs-6 lh-base'><i className='mdi mdi-map-marker-outline me-2'></i>{dataProject.location}</h4>
                                <div className="row">

                                    <div className='col-12 col-lg-6 '>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Quản lý dự án</p>
                                            <p className='m-0 fw-light text-uppercase'>{dataProject.userCreate}</p>
                                            <p className='m-0 mt-3 fs-5'>Loại dự án</p>
                                            <ul className='m-0 fw-light '>{dataProject.category.map((item, index) => (
                                                <li key={"caterogy" + index}>{item.categoryName}</li>
                                            ))}</ul>
                                            <p className='m-0 mt-3 fs-5'>Đối tượng cần hỗ trợ</p>
                                            <p className='m-0 fw-light '>{dataProject.impact}</p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Ngày bắt đầu</p>
                                            <p className='m-0 fw-light '>{moment(dataProject.createTime).format('DD /MM/yyyy')}</p>
                                            <p className='m-0 mt-3 fs-5'>Ngày kết thúc</p>
                                            <p className='m-0 fw-light '>{moment(dataProject.endDate).format('DD/MM/yyyy')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Đóng góp  */}
                            <div className="border mt-5 bg-white">
                                <div className={clsx(Style.backgroundBaseColor, 'container')} >

                                    <div className='row align-items-center py-3'>
                                        <div className="col-4 ">
                                            <img className="img-fluid rounded-3" src={process.env.REACT_APP_URL + dataProject.bannerPath} alt="project img" />
                                        </div>
                                        <div className="col-8">
                                            <h4 className='m-0 fs-5 text-center text-white'><i className='mdi mdi-coin me-2'></i>{dataProject.title}</h4>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center mt-5 mb-1">Chọn loại tiền điện tử</p>
                                <button className={clsx(Style.coinBtn, 'mx-auto px-4 py-1 d-flex justify-content-between bg-white')}>
                                    <img src={trxCoin} alt="tiền điện tử" width="24" height="24" className="me-2" />
                                    <span className="fw-bold">Tron</span>
                                </button>
                                <p className="text-center mt-4 mb-1">Nhập số tiền muốn đóng góp</p>
                                <div className="d-flex flex-row justify-content-center">

                                    <div className={clsx(Style.inputTrx, 'd-flex flex-column text-center px-2')}>
                                        <input type="number" inputMode="numeric" min="1" className=" fs-4 py-1 text-center fw-bolder" value={valueTrx} onChange={(e) => setValueTrx(e.target.value)} />
                                        <span className=" text-muted p-2 ">~ {formatNumber(valueTrx * trxPrice)}</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <div className="fw-bold">TRX</div>
                                        <div className=" text-center"><i className="mdi mdi-swap-vertical border rounded-circle fw-bolder p-1"></i></div>
                                        <div className="fw-bold">VNĐ</div>
                                    </div>
                                </div>
                                <button className={clsx(Style.backgroundForeignColor, "fs-5 w-100 mt-5 p-2 text-white text-center text-uppercase")} onClick={handleDonate}>Tiếp tục<i className="mdi mdi-arrow-right-drop-circle-outline ms-1"></i></button>
                                {
                                    dataProject.isEdit === true ? <button className={clsx(Style.backgroundBaseColor, "fs-5 w-100 p-2 text-white text-center text-uppercase")} onClick={handleWithdraw}>Rút tiền<i className="mdi mdi-cash-multiple ms-1"></i></button> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Tiến trình dự án  */}
            <div id="process" className={clsx(Style.process, 'py-5')} >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2>Tiến trình dự án</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                        </div>
                        <div className="col-12 col-lg-6 text-end border-end">
                            <p className={clsx(Style.baseColor, 'm-0 fs-5')}>Mục tiêu của chúng tôi</p>
                            <p className={clsx(Style.foreignColor, 'm-0')}>{formatNumber(dataProject.amountNeed)} VNĐ</p>
                        </div>
                    </div>

                    {/* Tab content  */}
                    <div id={clsx(Style.tabContent)} className="row ">
                        <div className="col-12">
                            <ul className="nav nav-pills my-5 flex-nowrap overflow-auto" id="pills-tab" role="tablist">
                                {
                                    dataProject.processes.map((item, index) => (
                                        <li key={"nav-item" + index} className={clsx(Style.navItem, 'd-flex align-items-center ')} role="presentation">
                                            <button className={clsx("bg-transparent px-3 px-lg-4  border  rounded-pill ", index === 0 ? "active" : "")} id={"pills-" + index + '-tab'} data-bs-toggle="pill" data-bs-target={"#pills-" + index} type="button" role="tab" aria-controls={"pills-" + index} aria-selected={index == 0 ? "true" : "false"}>
                                                <div style={{ borderBottom: "1px dashed #ccc" }} className="fw-bold text-white">
                                                    T{index + 1}
                                                </div>
                                                <div style={{ fontSize: '12px' }} className=" text-muted ">{formatNumber(Number(item.amountNeed))}</div>
                                            </button>
                                            {index < dataProject.processes.length - 1 ? <div className={clsx(Style.tabLine)}></div> : ""}
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                {
                                    dataProject.processes.map((item, index) => (
                                        <div key={"tab-content" + index} className={clsx("tab-pane fade", index === 0 ? "show active" : "")} id={"pills-" + index} role="tabpanel" aria-labelledby={"pills-" + index + "-tab"}>

                                            <div className={clsx(Style.baseColor, 'd-flex flex-column flex-md-row justify-content-between align-items-center my-5')}>
                                                <div className="d-flex  align-items-center align-self-start">
                                                    <i className="mdi mdi-chart-donut fs-1 me-3 pe-3 border-end"></i>
                                                    <div className="">
                                                        <p className="mb-0  text-uppercase">Trạng thái</p>
                                                        <p className={clsx(Style.foreignColor, 'm-0 fs-5 text-uppercase')}>{item.status === 1 ? "Chưa bắt đầu" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</p>
                                                    </div>
                                                </div>
                                                {
                                                    dataProject.isEdit === true ? (
                                                        <Link to={{
                                                            pathname: `/update-process/${item.processId}`,
                                                            state: item // chuyền dữ liệu qua Update-process
                                                        }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} ><i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa tiến trình</Link>
                                                    ) : null
                                                }

                                            </div>

                                            <div className='my-5'>
                                                <h2 className={clsx(Style.baseColor, Style.title, 'fs-4 text-uppercase')}>{item.title}</h2>
                                                <SetInnerHTML text={item.shortDescription} />
                                            </div>

                                            <div className="row mt-5">
                                                {
                                                    item.content ?
                                                        <div className="col-12 col-lg-6">
                                                            <div className="mb-5">
                                                                <h3 className="fs-5 mb-4 text-uppercase">Nội dung</h3>
                                                                <SetInnerHTML text={item.content} />
                                                            </div>
                                                            <div className="mb-5">
                                                                <h3 className="fs-5 mb-4 text-uppercase">Hình ảnh</h3>
                                                                {
                                                                    item.listImages.length > 0 ?
                                                                        item.listImages.map((itemImage, index) => (
                                                                            <span key={"image" + index} className="p-3">
                                                                                <Zoom>
                                                                                    <img src={process.env.REACT_APP_URL + '/' + itemImage.filePath} width="100px" height="100px" alt="" />
                                                                                </Zoom>
                                                                            </span>
                                                                        )) : ""
                                                                }
                                                            </div>

                                                        </div> : ""
                                                }
                                                {
                                                    item.expenses.length > 0 ?
                                                        <div className="col-12 col-lg-6">
                                                            <div className="">
                                                                <h3 className="fs-5 mb-4 text-uppercase">Chi phí</h3>
                                                                {/* Danh sách chi phí  */}
                                                                {
                                                                    item.expenses.map((itemExpense, index) => (
                                                                        <div key={index} className={clsx(Style.expenseCard, 'p-2')}>
                                                                            <div className={clsx(Style.expenseHeader, Style.foreignColor, 'd-flex justify-content-between fs-5')}>
                                                                                <span className='text-uppercase m-0'>Tổng chi</span>
                                                                                <span className='text-uppercase m-0'>{formatNumber(Number(itemExpense.amount))} VNĐ</span>
                                                                            </div>
                                                                            <div className={clsx(Style.expenseBody, 'p-4 bg-white text-dark')}>
                                                                                <div className="expense-body-header d-flex justify-content-around flex-column flex-md-row">
                                                                                    <span className="">
                                                                                        <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-calendar-check me-1"></i>Ngày</div>
                                                                                        <div>{moment(itemExpense.createTime).format("DD/MM/YYYY")}</div>
                                                                                    </span>
                                                                                    <span className="">
                                                                                        <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-magnify me-1"></i>Loại</div>
                                                                                        <div>Thanh Toán</div>
                                                                                    </span>
                                                                                    <span className="">
                                                                                        <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-coin me-1"></i>Số tiền</div>
                                                                                        <div>{itemExpense.amount} vnd</div>
                                                                                    </span>
                                                                                    <span className="">
                                                                                        <div className={clsx(Style.foreignColor)}><i className="mdi mdi-file-check me-1"></i>Hóa đơn</div>
                                                                                        <div className="text-md-center">
                                                                                            <a href={itemExpense.list} download className={clsx(Style.foreignColor)}><i className="mdi mdi-briefcase-download fs-4"></i></a>
                                                                                        </div>
                                                                                    </span>
                                                                                </div>

                                                                                <div className="expense-body-desc my-5">
                                                                                    <p className={clsx(Style.foreignColor, 'm-0 mb-2')}><i className="mdi mdi-eye-outline me-1"></i>Mô tả</p>
                                                                                    <SetInnerHTML text={itemExpense.description} />
                                                                                </div>
                                                                                <div className="expense-body-transaction">
                                                                                    <p className={clsx(Style.foreignColor, 'm-0')}><i className="mdi mdi-repeat me-1"></i>Lịch sử giao dịch</p>
                                                                                    <a href={"https://tronscan.org/#/contract/" + dataProject.addressContract} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, 'text-decoration-none')}>Xem trên Blockchain</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                        </div> : ""
                                                }


                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Các bài viết của dự án  */}
            <div id="artical" className={clsx(Style.artical, 'py-5')}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Cập nhật mới nhất</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 py-4">

                            <Slider {...settingSliderArtical}>
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

            {/* Những người quyên góp  */}
            <div id="donors" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Người đóng góp</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 py-4">

                            <Slider {...settingSliderDonors}>
                                {
                                    dataProject.transaction.map((item, index) => (
                                        <div key={index} className={clsx(Style.articalDetail, "d-flex flex-column  p-3 ")}>
                                            <div className="rounded-circle d-inline-block mx-auto p-2 border">
                                                <img src={process.env.REACT_APP_URL + item.userAvatar}
                                                    onError={(e) => (e.target.onerror = null, e.target.src = logoCharity)}
                                                    alt="hình đại diện" width="100px" height="100px" className=" rounded-circle" />
                                            </div>
                                            <div className="my-3">
                                                <p className="m-0 text-center">{item.userName}</p>
                                                <div className="m-0 d-flex justify-content-center">
                                                    <img src={trxCoin} alt="coin" className="" width="16px" />
                                                    <span className="ms-1 fw-bold">{item.amount}</span>
                                                </div>
                                                <a href={"https://nile.tronscan.org/#/transaction/" + item.hash} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}>Chi tiết</a>

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

export default ProjectDetail;