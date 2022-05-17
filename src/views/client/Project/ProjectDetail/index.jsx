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
import * as utils from '../../../../utils/utils.js';

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
import Loading from "./../../../../shares/Loading/index";
import Table from 'react-bootstrap/Table'
ProjectDetail.propTypes = {

};

function ProjectDetail(props) {
    const tronweb = window.tronWeb;

    const locations = useLocation().pathname
    const [isLoading, setIsLoading] = useState(true)

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
    const { id, friendlyurl } = useParams()
    console.log(id)
    useEffect(() => {
        // Lấy thông tin dự án từ API
        const fetchDataProject = async () => {
            const response = await projectApi.get(id)
            if (response.isSuccess) {
                setDataProject(response.data)
                setIsLoading(false)
                console.log('project from api: ', response.data)
                console.log('data-project: ', dataProject)
                // Lấy kết quả dự án từ Blockchain
                console.log('- Time now: ', new Date().getTime())
                console.log('- Time enddate: ', new Date(response.data.endDate).getTime())
                console.log('- Time enddate utc: ', new Date(moment.utc(response.data.endDate).local()).getTime())
                // if (response.data.status === 2 && (new Date().getTime()) >= (new Date(moment.utc(dataProject.endDate).local()).getTime())) {
                //     const sm = await tronweb.contract().at(response.data.addressContract)
                //     const result = await sm.Result().call()
                //         .then(
                //             (res) => {
                //                 if (res) {
                //                     console.log('- project success: ', res)
                //                     const updateProjectSuccess = async () => {
                //                         const result = await projectApi.upStatusProject(id)
                //                         if (result.isSuccess) {
                //                             console.log('success: ', result.message)
                //                         } else {
                //                             console.log('fail: ', result.message)
                //                         }
                //                     }
                //                     updateProjectSuccess()
                //                 } else {
                //                     console.log('- project fail: ', res)
                //                     const updateProjectFail = async () => {
                //                         const result = await projectApi.upStatusProjectFail(id)
                //                         if (result.isSuccess) {
                //                             console.log('success: ', result.message)
                //                         } else {
                //                             console.log('fail: ', result.message)
                //                         }
                //                     }
                //                     updateProjectFail()
                //                 }
                //             }
                //         )
                // }

            }
        }

        fetchDataProject()
    }, [id])
    useEffect(() => {
        console.log("dataProject", dataProject.articals)
    }, [dataProject])

    // URL map location
    const urlLocation = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDEhyx111_aA4TIk0BPHGyLTOZnIFChjGc&q=" + dataProject.location.replaceAll(' ', '+');

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



    // Setting slider 
    const settingSliderArtical = {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true,

        responsive: [

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
    // const HttpProvider = tronweb.providers.HttpProvider;
    // tronweb.eventServer = new HttpProvider("https://nile.trongrid.io")

    // ------------------------------------------------------------------- DONATE 
    // Hàm xử lý đóng góp cho dự án
    const handleDonate = () => {
        if ((new Date().getTime()) < new Date(moment.utc(dataProject.endDate).local()).getTime()) {
            if (!!window.tronWeb === false) {
                swal2.fire({
                    title: "Thông báo",
                    html: `Vui lòng cài đặt TronLink để tham gia đóng góp.</br>`
                        + `</br><a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Cài đặt TronLink tại đây</a>`,
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
            } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
                swal2.fire({
                    title: "Thông báo",
                    text: "Vui lòng đăng nhập TronLink để tham gia đóng góp.",
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
            } else {
                donate()
            }
        } else {
            swal2.fire({
                title: "Thông báo",
                html: "Dự án đã kết thúc.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }


    }

    // Gọi hàm Donate từ Smart Contract
    async function donate() {
        if ((await tronweb.trx.getBalance(tronweb.defaultAddress.base58)) > (valueTrx * 1000000)) {
            try {
                const sm = await tronweb.contract().at(dataProject.addressContract)

                const result = await sm.Donate(valueTrx * 1000000).send({
                    feeLimit: 100_000_000,
                    callValue: valueTrx * 1000000,
                    // shouldPollResponse:true
                })
                    .then((res) => {
                        console.log('Donate: ', res)

                        if (typeof res === 'string') {
                            setIsLoading(true)
                            // swal2.fire({
                            //     title: "Xác nhận đóng góp.",
                            //     text: "Đóng góp của bạn sẽ được cập nhật trong giây lát.",
                            //     icon: "success",
                            //     confirmButtonColor: 'var(--love-color-1)'

                            // });

                            const checkConfirmTransaction = setInterval(async () => {
                                console.log("chạy 1 lần: ", res)
                                await tronweb.trx.getUnconfirmedTransactionInfo(res)
                                    .then((response) => {
                                        if (response.receipt) {
                                            if (response.receipt.result === "SUCCESS") {
                                                clearInterval(checkConfirmTransaction)
                                                console.log("Giao dịch thành công. Lưu vào database.")
                                                saveTransactionDonate(res)
                                                setIsLoading(false)
                                                swal2.fire({
                                                    title: "Đóng góp thành công.",
                                                    html: "Đóng góp của bạn đã được xác nhận thành công. </br></br> Chúng tôi chân thành cảm ơn bạn. </br></br> Chúc bạn luôn mạnh khỏe và thành công trong cuộc sống.</br> </br> Lưu ý: giá trị TRX biến đổi theo thời gian.</br> "
                                                        + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                    icon: "success",
                                                    confirmButtonColor: 'var(--love-color-1)'

                                                });
                                            }
                                            if (response.receipt.result !== "SUCCESS") {
                                                clearInterval(checkConfirmTransaction)
                                                setIsLoading(false)
                                                console.log("FAIL - clearInterval")
                                                swal2.fire({
                                                    title: "Đóng góp không thành công.",
                                                    html: "Giao dịch thất bại. Vui lòng kiểm tra số dư ví.</br>"
                                                        + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                    icon: "error",
                                                    confirmButtonColor: 'var(--love-color-1)'

                                                });
                                            }
                                        }
                                    })
                            }, 2000)
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
        } else {
            swal2.fire({
                title: "Thông báo",
                text: "Số dư ví không đủ",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }


    // Lưu giao dịch donate thành công vào database
    const saveTransactionDonate = async (hash) => {
        const data = {
            id: id,
            amount: valueTrx,
            hash: hash,
        }
        const response = await clientUser.donateProject(data)
        console.log('Đã lưu donate vào database: ', response.data)
    }

    // ---------------------------------------------------------------- WITHDRAW
    // Hàm xử lý rút tiền 
    const handleWithdraw = () => {
        console.log(new Date().getTime())
        console.log(new Date(moment.utc(dataProject.endDate).local()).getTime())
        if ((new Date().getTime()) >= (new Date(moment.utc(dataProject.endDate).local()).getTime())) {
            if (!!window.tronWeb === false) {
                swal2.fire({
                    title: "Thông báo",
                    html: `Vui lòng cài đặt TronLink để rút tiền.</br>`
                        + `</br><a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Cài đặt TronLink tại đây</a>`,
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
        } else {
            swal2.fire({
                title: "Thông báo",
                html: "Chưa đến ngày kết thúc của dự án. </br> Vui lòng thử lại sau khi kết thúc dự án.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }

    }

    // Hàm rút tiền từ Smart contract
    async function withdraw() {

        try {
            const sm = await tronweb.contract().at(dataProject.addressContract)
            const result = await sm.Withdraw(valueTrx * 1000000).send({
                feeLimit: 100_000_000,
                callValue: valueTrx * 1000000,
                // shouldPollResponse:true
            })
                .then((res) => {
                    console.log('Withdraw: ', res)

                    if (typeof res === 'string') {
                        setIsLoading(true)
                        // swal2.fire({
                        //     title: "Xác nhận rút tiền.",
                        //     text: "Yêu cầu rút tiền của bạn sẽ được cập nhật trong giây lát.",
                        //     icon: "success",
                        //     confirmButtonColor: 'var(--love-color-1)'

                        // });

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
                                            setIsLoading(false)
                                            swal2.fire({
                                                title: "Rút tiền thành công.",
                                                html: "Yêu cầu rút tiền của bạn đã được xác nhận thành công.</br>"
                                                    + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                icon: "success",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                        if (response.receipt.result !== "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            setIsLoading(false)
                                            console.log("FAIL - clearInterval")
                                            swal2.fire({
                                                title: "Rút tiền không thành công.",
                                                html: `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                icon: "error",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                    }
                                })
                        }, 2000)
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
            amount: valueTrx,
            hash: hash,
        }
        const response = await clientUser.widthdrawProject(data)
        console.log('Đã lưu withdraw vào database: ', response.data)
    }

    // ---------------------------------------------------------------- REFUND
    // Hàm xử lý hoàn tiền 
    const handleRefund = () => {
        console.log(new Date().getTime())
        console.log(new Date(dataProject.endDate).getTime())
        if ((new Date().getTime()) >= new Date(moment.utc(dataProject.endDate).local()).getTime()) {
            if (!!window.tronWeb === false) {
                swal2.fire({
                    title: "Thông báo",
                    html: `Vui lòng cài đặt TronLink và sử dụng đúng ví tạo dự án để rút tiền.</br>`
                        + `</br><a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Cài đặt TronLink tại đây</a>`,
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
            } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
                swal2.fire({
                    title: "Thông báo",
                    text: "Vui lòng đăng nhập TronLink và sử dụng đúng ví đóng góp để được hoàn tiền.",
                    icon: "info",
                    confirmButtonColor: 'var(--love-color-1)'

                });
            } else {
                refund()
            }
        } else {
            swal2.fire({
                title: "Thông báo",
                html: "Chưa đến ngày kết thúc của dự án. </br> Vui lòng thử lại sau khi kết thúc dự án.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }

    }

    // Hàm hoàn tiền từ Smart contract
    async function refund() {

        try {
            const sm = await tronweb.contract().at(dataProject.addressContract)
            const result = await sm.Refund().send({
                feeLimit: 100_000_000,
                // shouldPollResponse:true
            })
                .then((res) => {
                    console.log('Refund: ', res)

                    if (typeof res === 'string') {
                        setIsLoading(true)
                        // swal2.fire({
                        //     title: "Xác nhận hoàn tiền.",
                        //     text: "Yêu cầu hoàn tiền của bạn sẽ được cập nhật trong giây lát.",
                        //     icon: "success",
                        //     confirmButtonColor: 'var(--love-color-1)'

                        // });

                        const checkConfirmTransaction = setInterval(async () => {
                            console.log("chạy 1 lần")
                            console.log("data: ", res)
                            await tronweb.trx.getUnconfirmedTransactionInfo(res)
                                .then((response) => {
                                    if (response.receipt) {
                                        if (response.receipt.result === "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            console.log("Hoàn tiền thành công. Lưu vào database.")
                                            saveTransactionRefund(res)
                                            setIsLoading(false)
                                            swal2.fire({
                                                title: "Hoàn tiền thành công.",
                                                html: "Yêu cầu hoàn tiền của bạn đã được xác nhận thành công.</br>"
                                                    + `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                icon: "success",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                        if (response.receipt.result !== "SUCCESS") {
                                            clearInterval(checkConfirmTransaction)
                                            setIsLoading(false)
                                            console.log("FAIL - clearInterval")
                                            swal2.fire({
                                                title: "Hoàn tiền không thành công.",
                                                html: `</br><a href="https://nile.tronscan.org/#/transaction/${res}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" >Chi tiết giao dịch</a>`,
                                                icon: "error",
                                                confirmButtonColor: 'var(--love-color-1)'

                                            });
                                        }
                                    }
                                })
                        }, 2000)
                    }
                })
        }
        catch (err) {
            console.error(err);
            swal2.fire({
                title: "Hoàn tiền không thành công",
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    // Lưu giao dịch refund thành công vào database
    const saveTransactionRefund = async (hash) => {
        const data = {
            id: id,
            amount: 0, // đưa value sai ---------------------- check lại
            hash: hash,
        }
        const response = await clientUser.refundProject(data)
        console.log('Đã lưu refund vào database: ', response.data)
    }
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <>
                        {/* Header dự án  */}
                        <div className={clsx(Style.headerProject, 'py-5 ')} >
                            <div className="container ">
                                <div className="row">

                                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
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
                                                <p className=" mb-0 py-1">{dataProject.userType == 1 ? 'Cá nhân' : 'Tổ chức'}</p>
                                                <Link to={`/profile/${dataProject.userCreateId}`} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, 'text-uppercase text-decoration-none')}>{dataProject.userCreate}</Link>
                                            </div>
                                        </div>

                                        <h1 className="py-3">{dataProject.title}</h1>
                                        <SetInnerHTML text={dataProject.shortDescription} />

                                        <div className="ProgressBarContent my-3">
                                            <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                            <ProgressBar striped now={Math.floor(((Number(dataProject.amountNow) * trxPrice) / Number(dataProject.amountNeed)) * 100) + 5} label={`${Math.floor(((Number(dataProject.amountNow) * trxPrice) / Number(dataProject.amountNeed)) * 100)} %`} />
                                            <span>{utils.formatNumber((Number(dataProject.amountNow) * trxPrice).toFixed(0))} VNĐ <span className="text-muted" style={{ fontSize: '12px' }}>({dataProject.amountNow} TRX)</span> / {utils.formatNumber(dataProject.amountNeed)} VNĐ  <span className="text-muted" style={{ fontSize: '12px' }}>({dataProject.amountTRXNeed} TRX)</span></span>
                                        </div>
                                        {
                                            dataProject.status !== 1 ? (
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <Button className={clsx(Style.backgroundForeignColor, 'my-2 w-100 text-light border-0')}>
                                                            <a href={"https://nile.tronscan.org/#/contract/" + dataProject.addressContract + "/transactions"} target="_blank" rel="noreferrer" className={clsx('d-inline-block w-100 text-white text-decoration-none')}><i className='mdi mdi-dropbox me-1'></i>Xem trên Blockchain</a>
                                                        </Button>


                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <Button className={clsx(Style.backgroundForeignColor, 'px-5 my-2 w-100 text-light border-0')}><i className='mdi mdi-heart-outline me-1'></i>Theo dõi</Button>

                                                    </div>
                                                </div>
                                            ) : ""
                                        }



                                        <div className={clsx(Style.baseColor, 'd-flex flex-column flex-md-row justify-content-between align-items-center my-3')}>
                                            <div className="border-start px-3 d-flex flex-column align-self-start">
                                                <span className="text-white"><i className="mdi mdi-history pe-2"></i>Trạng thái</span>
                                                <span className={clsx(Style.baseColor, 'text-uppercase')}>{dataProject.status === 1 ? "Đang chờ duyệt" : (dataProject.status === 2 ? "Đang thực thi" : (dataProject.status === 3 ? "Đã hoàn thành" : "Thất bại"))}</span>
                                            </div>
                                            {/* {
                                                dataProject.isEdit === true ? (
                                                    <Link to={{
                                                        pathname: `/update-project/${id}/${dataProject.friendlyUrl}`,
                                                        state: locations // chuyền dữ liệu qua Update-process

                                                    }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} >
                                                        <i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa dự án</Link>

                                                ) : null
                                            } */}

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
                                                        <p className='m-0 fw-light '>{moment(dataProject.createTime).format('DD/MM/yyyy')}</p>
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
                                                    <span className=" text-muted p-2 ">~ {utils.formatNumber(valueTrx * trxPrice)}</span>
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <div className="fw-bold">TRX</div>
                                                    <div className=" text-center"><i className="mdi mdi-swap-vertical border rounded-circle fw-bolder p-1"></i></div>
                                                    <div className="fw-bold">VNĐ</div>
                                                </div>
                                            </div>
                                            {
                                                dataProject.status !== 1
                                                    ? (dataProject.status === 2 ? <button className={clsx(Style.backgroundForeignColor, "fs-5 w-100 mt-5 p-2 text-white text-center text-uppercase")} onClick={handleDonate}>Đóng góp<i className="mdi mdi-currency-usd ms-1"></i></button> : "")
                                                    : <button className={clsx("bg-secondary fs-5 w-100 p-2 text-white text-center text-uppercase")} >Vui lòng chờ duyệt để tham gia đóng góp</button>

                                            }
                                            {
                                                dataProject.status === 4
                                                    ? <button className={clsx("bg-secondary fs-5 w-100 p-2 text-white text-center text-uppercase")} onClick={handleRefund}>Hoàn tiền<i className="mdi mdi-backup-restore ms-1"></i></button>
                                                    : ""
                                            }
                                            {
                                                dataProject.status === 3 && dataProject.isEdit === true
                                                    ? <button className={clsx(Style.backgroundBaseColor, "fs-5 w-100 p-2 text-white text-center text-uppercase")} onClick={handleWithdraw}>Rút tiền<i className="mdi mdi-cash-multiple ms-1"></i></button>
                                                    : ""
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
                                        <p className={clsx(Style.foreignColor, 'm-0')}>{utils.formatNumber(dataProject.amountNeed)} VNĐ</p>
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
                                                            <div style={{ fontSize: '12px' }} className=" text-muted ">{utils.formatNumber(Number(item.amountNeed))}</div>
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
                                                            {/* {
                                                                dataProject.isEdit === true ? (
                                                                    <Link to={{
                                                                        pathname: `/update-process/${item.processId}`,
                                                                        state: item // chuyền dữ liệu qua Update-process
                                                                    }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} ><i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa tiến trình</Link>
                                                                ) : null
                                                            } */}

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
                                                                                            <span className='text-uppercase m-0'>{utils.formatNumber(Number(itemExpense.amount))} VNĐ</span>
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
                                                                                                        <a href={process.env.REACT_APP_URL + itemExpense.file} download className={clsx(Style.foreignColor)}><i className="mdi mdi-briefcase-download fs-4"></i></a>
                                                                                                    </div>
                                                                                                </span>
                                                                                            </div>

                                                                                            <div className="expense-body-desc my-5">
                                                                                                <p className={clsx(Style.foreignColor, 'm-0 mb-2')}><i className="mdi mdi-eye-outline me-1"></i>Mô tả</p>
                                                                                                <SetInnerHTML text={itemExpense.description} />
                                                                                            </div>
                                                                                            <div className="expense-body-transaction">
                                                                                                <p className={clsx(Style.foreignColor, 'm-0')}><i className="mdi mdi-repeat me-1"></i>Lịch sử giao dịch</p>
                                                                                                <a href={"https://nile.tronscan.org/#/contract/" + dataProject.addressContract + "/transactions"} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, 'text-decoration-none')}>Xem trên Blockchain</a>
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
                                        {
                                            (dataProject.articals.length > 0) ? (
                                                <>
                                                    <Slider {...settingSliderArtical}>
                                                        {
                                                            dataProject.articals.map((item, index) => (
                                                                <div key={index} className={clsx(Style.articalDetail, " p-4 ")}>
                                                                    <div className={clsx(Style.articalDetailWrap, 'position-relative p-3 rounded-3 shadow')}>

                                                                        <div className={clsx(Style.header)}>
                                                                            <img src={process.env.REACT_APP_URL + item.banner} alt="hình ảnh bài viết" className="" />
                                                                        </div>

                                                                        <div className={clsx(Style.body, ' px-3 py-4')}>
                                                                            <Link to={"/bai-viet/" + item.articalId + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className='text-decoration-none '>

                                                                                <h4 className="fs-4 text-center text-uppercase">{item.title}</h4>
                                                                            </Link>

                                                                            <div className="d-flex justify-content-between my-4">

                                                                                <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-1"></i>{item.userCreate}</p>
                                                                                <p className='m-0 fst-italic'>{moment.utc(item.createTime).local().format("DD/MM/YYYY")}<i className="mdi mdi-calendar-check ms-1"></i></p>
                                                                            </div>
                                                                            <div className={clsx(Style.bodyDesc)}>
                                                                                <SetInnerHTML text={item.content} />
                                                                            </div>
                                                                        </div>
                                                                        <div className={clsx(Style.footer)}>
                                                                            <Link to={"/bai-viet/" + item.articalId + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className='text-decoration-none '>Xem chi tiết<i className="mdi mdi-arrow-right-bold-circle-outline ms-2"></i></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </Slider>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="px-3 text-center fst-italic">Chúng tôi mong chờ sự đóng góp từ các bạn để dự án được triển khai tốt hơn.</p>
                                                    <p className="px-3 text-center fst-italic">Các hoạt động của dự án sẽ được cập nhật tại đây.</p>
                                                </>
                                            )
                                        }
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

                                        {
                                            (dataProject.transaction.filter((item) => item.type === 1).length > 0) ? (
                                                <>
                                                    <Slider {...settingSliderDonors}>
                                                        {
                                                            dataProject.transaction
                                                                .filter((item) => item.type === 1)
                                                                .map((item, index) => (
                                                                    <div key={index} className={clsx(Style.articalDetail, "d-flex flex-column  p-3 ")}>
                                                                        <div className="rounded-circle d-inline-block mx-auto p-2 border">
                                                                            <img src={process.env.REACT_APP_URL + item.userAvatar}
                                                                                onError={(e) => (e.target.onerror = null, e.target.src = logoCharity)}
                                                                                alt="hình đại diện" width="80px" height="80px" className=" rounded-circle" />
                                                                        </div>
                                                                        <div className="my-3">
                                                                            <p className="m-0 text-center">{item.userName}</p>
                                                                            <div className="m-0 d-flex flex-column justify-content-center">
                                                                                <div className="d-flex justify-content-center">

                                                                                    <img src={trxCoin} alt="coin" className="" width="16px" />
                                                                                    <span className="ms-1 fw-bold">{item.amount}</span>
                                                                                </div>
                                                                                <span className="text-center" style={{ fontSize: '12px' }}>{utils.formatNumber(Math.floor(Number(item.amount) * trxPrice))} VNĐ</span>
                                                                            </div>
                                                                            <a href={"https://nile.tronscan.org/#/transaction/" + item.hash} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}>Chi tiết</a>

                                                                        </div>
                                                                    </div>
                                                                ))
                                                        }

                                                    </Slider>
                                                </>
                                            ) : <>
                                                <p className="px-3 text-center fst-italic">Chúng tôi mong chờ sự đóng góp từ các bạn để dự án được triển khai tốt hơn.</p>
                                                <p className="px-3 text-center fst-italic">Danh sách tham gia đóng góp dự án sẽ hiển thị tại đây.</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lịch sử rút tiền  */}
                        <div id="withdraw" className={clsx(Style.withdraw, "py-5")}>
                            <div className="container">
                                <div className="row ">
                                    <div className="col-12">
                                        <h2>Lịch sử rút tiền</h2>
                                        <div className={clsx(Style.line)}><hr /></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 py-4">
                                        {
                                            (dataProject.transaction.filter((item) => item.type === 3).length > 0) ? (
                                                <>
                                                    <Slider {...settingSliderDonors}>
                                                        {
                                                            dataProject.transaction
                                                                .filter((item) => item.type === 3)
                                                                .map((item, index) => (
                                                                    <div key={index} className={clsx(Style.articalDetail, "d-flex flex-column  p-3 ")}>
                                                                        <div className="rounded-circle d-inline-block mx-auto p-2 border">
                                                                            <img src={process.env.REACT_APP_URL + item.userAvatar}
                                                                                onError={(e) => (e.target.onerror = null, e.target.src = logoCharity)}
                                                                                alt="hình đại diện" width="80px" height="80px" className=" rounded-circle" />
                                                                        </div>
                                                                        <div className="my-3">
                                                                            <p className="m-0 text-center">{item.userName}</p>

                                                                            <div className="m-0 d-flex flex-column justify-content-center">
                                                                                <div className="d-flex justify-content-center">

                                                                                    <img src={trxCoin} alt="coin" className="" width="16px" />
                                                                                    <span className="ms-1 fw-bold">{item.amount}</span>
                                                                                </div>
                                                                                <span className="text-center" style={{ fontSize: '12px' }}>{utils.formatNumber(Math.floor(Number(item.amount) * trxPrice))} VNĐ</span>
                                                                            </div>
                                                                            <a href={"https://nile.tronscan.org/#/transaction/" + item.hash} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}>Chi tiết</a>

                                                                        </div>
                                                                    </div>
                                                                ))
                                                        }
                                                    </Slider>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="px-3 text-center fst-italic">Chúng tôi mong chờ sự đóng góp từ các bạn để dự án được triển khai tốt hơn.</p>
                                                    <p className="px-3 text-center fst-italic">Lịch sử rút tiền của dự án sẽ hiển thị tại đây.</p>
                                                </>
                                            )
                                        }
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

export default ProjectDetail;