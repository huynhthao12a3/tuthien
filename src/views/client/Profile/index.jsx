import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import Style from './Profile.module.scss'
import Table from 'react-bootstrap/Table'
import projectApi from '../../../api/Project'
import Loading from '../../../shares/Loading';
import moment from 'moment';
import * as utils from '../../../utils/utils.js'
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useLocation } from "react-router-dom";
import clientUser from '../../../api/User/Client';
import Zoom from "react-medium-image-zoom";
import SetInnerHTML from "./../../../shares/setInnerHTML/index";
import { Button, Form, Modal } from "react-bootstrap";
import { MakeUrl, removeUnicode } from '../../../utils/utils';
import Swal from "sweetalert2";
import articalApi from '../../../api/Artical';
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import imgDefault from '../../../assets/images/default_image.png'
import ModalArticalDetai from '../../../shares/ModalArticalDetail';
import adminUser from "../../../api/User/Admin"
import Select from 'react-select'
import ProgressBar from "react-bootstrap/ProgressBar";

let idProjectDetail = 0
ClientProfile.propTypes = {

};

function ClientProfile(props) {
    // const imgDefault = "\\uploads\\Images\\project\\02052022_043453_default-image-620x600.jpg"
    const locations = useLocation().pathname
    const imgFormat = ['gif', 'png', 'tiff', 'raw', 'psd', 'jpg']

    const [projectList, setProjectList] = useState([])
    const [sta, setSta] = useState(1)// load lại danh sách
    const [userInfo, setUserInfo] = useState({
        id: 3,
        avatar: "\\uploads\\Images\\user\\04052022_015730_pexels-photo-7492325.jpg",
        fullName: "Huỳnh Văn Thảo",
        email: "thao321@gmail.com",
        phoneNumber: "0987654321",
        address: "kp5, phường Trảng dài, tp Biên Hòa, tỉnh Đồng Nai.",
        projectFollow: []
    })
    const [userTransaction, setUserTransaction] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    // const [isFollow, setIsFollow] = useState(true)
    const [currentpage, setCurrentpage] = useState(0)



    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await clientUser.getUserInfo();
            if (response.isSuccess) {
                setUserInfo(response.data)
                setIsLoading(false)
                console.log(response.data)

            }
        }
        const fetchUserTransaction = async () => {
            const response = await clientUser.getTransaction();
            if (response.isSuccess) {
                setUserTransaction(response.data)
                setIsLoading(false)
                console.log(response.data)
                console.log('transaction: ', response.data)
            }
        }
        fetchUserInfo()
        fetchUserTransaction()

    }, [sta])
    useEffect(() => {
        const fetchProjectList = async () => {
            const params = {
                currentpage: currentpage
            }
            const response = await projectApi.getOwnerProject(params)
            if (response.isSuccess) {
                setProjectList(response.data)
                setIsLoading(false)
            } else {
                console.log(response.data)
            }
        }
        fetchProjectList()
    }, [currentpage])



    const [show, setShow] = useState(false);
    // Tiến trình
    const [projectDetail, setProjectDetail] = useState(
        {
            "userCreateId": 1,
            "title": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
            "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID1 19...</p>",
            "addressContract": "asdasxddasddasdasddsa",
            "friendlyUrl": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
            "category": [
                {
                    "categoryId": 2,
                    "categoryName": "Trẻ em"
                },
                {
                    "categoryId": 3,
                    "categoryName": "Khí hậu"
                },
                {
                    "categoryId": 4,
                    "categoryName": "Khắc phục thiên tai"
                },
                {
                    "categoryId": 5,
                    "categoryName": "Phát triển kinh tế"
                }
            ],
            "userCreate": "Huỳnh Khang",
            "createTime": "0001-01-01T00:00:00",
            "amountNow": 9,
            "amountNeed": 0,
            "status": 0,
            "summary": "<p>Đảm bảo các gia1 đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "problemToAddress": "<p>Đảm bảo 2các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "solution": "<p>Đảm bảo các gia đì3nh dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "location": "tp biên hòa, việt nam",
            "impact": "500 người dân",
            "endDate": "2022-08-11T09:12:22.737",
            "userType": 0,
            "bannerPath": "",
            "isEdit": false,
            "processes": [
                {
                    "processId": 3,
                    "title": "process 3",
                    "status": 1,
                    "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                    "content": "string",
                    "amountNeed": 100000000,
                    "listImages": [],
                    "expenses": [
                        {
                            "expenseId": 69,
                            "description": "<p>1</p>",
                            "amount": 1,
                            "createTime": "2022-04-14T03:58:18.4635746",
                            "listFiles": null
                        }
                    ]
                },
                {
                    "processId": 4,
                    "title": "process 4",
                    "status": 1,
                    "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                    "content": "string",
                    "amountNeed": 100000000,
                    "listImages": [],
                    "expenses": []
                },
                {
                    "processId": 5,
                    "title": "process 5",
                    "status": 1,
                    "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                    "content": "string",
                    "amountNeed": 100000000,
                    "listImages": [],
                    "expenses": [
                        {
                            "expenseId": 70,
                            "description": "<p>12312321312321312</p>",
                            "amount": 123123123123,
                            "createTime": "2022-04-14T04:07:07.1437925",
                            "listFiles": null
                        },

                    ]
                }
            ],
            "files": null,
            "articals": [],
            "transaction": [
                {
                    "userName": "huỳnh văn thảo",
                    "userAvatar": "",
                    "projectId": 4,
                    "projectName": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
                    "amount": 1,
                    "currency": "TRX",
                    "hash": "6f47680ecd756193d4897bc83d23d92f8499523a944cdfe41fba048c41491354"
                },

            ]
        })
    const handleShow = async function (id) {
        try {
            const respon = await projectApi.get(id)
            if (respon.isSuccess) {
                setProjectDetail(respon.data)
                console.log("setProjectDetail", projectDetail)
                setShow(true);
            }

        }
        catch (e) {
            console.error(e)
        }
    }

    // cập nhật thông tin người dùng
    const type = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'Cá nhân' },
        { value: '2', label: 'Tổ chức' },
    ]
    const handleChangAvatar = (e) => {
        setImgValue(e.target.files[0])
    }

    const [imgValue, setImgValue] = useState('')
    // const [sta, setSta] = useState(1)// load lại danh sách
    const [typeCreate, setTypeCreate] = useState([...type][1])// selector trạng thái
    const [showEdit, setShowEdit] = useState(false)

    useEffect(async () => {
        if (imgValue !== '') {
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            if (resultimg) {
                let form = new FormData();
                form.append('Image', imgValue);
                form.append('TypeImage', "user");
                const response = await projectApi.uploadFile(form);
                setUserInfo({ ...userInfo, avatar: response.data.filePath })
                if (!response.isSuccess) {
                    Swal.fire('Tải ảnh lên thất bại')
                }
            }
            else {
                Swal.fire('Tải ảnh lên thất bại')
                resultimg = ''
            }
        }
    }, [imgValue])

    const handleCloseEdit = () => { setShowEdit(false) }
    const handleShowEdit = () => { setShowEdit(true) }

    function HandleGetLable(filterlist, index) {
        return (
            filterlist.find(function (itemCategoty) {
                if (itemCategoty.value === (index + '')) {
                    return itemCategoty
                }
            })
        )
    }
    const handleUpdateUser = async () => {
        if (
            userInfo.fullName !== '' &&
            userInfo.phoneNumber !== '' &&
            userInfo.email !== '') {
            const data = {
                "fullName": userInfo.fullName,
                "phoneNumber": userInfo.phoneNumber,
                "avatarPath": userInfo.avatar,
                "email": userInfo.email,
                "type": Number(typeCreate.value),
                "address": userInfo.address
            }
            const respon = await clientUser.updateUserInfo(data)
            if (respon.isSuccess) {
                handleCloseEdit()
                setSta(sta * (-1))
                Swal.fire('Cập nhật thông tin thành công')
            }
            else {
                Swal.fire('Cập nhật thông tin thất bại')
            }

        }
        else {
            Swal.fire('Vui lòng điển đủ thông tin')
        }
    }
    // Bài viết 
    const [createArtical, setCreateArtical] = useState({
        "title": "",
        "content": "",
        "banner": {
            "fileName": "",
            "filePath": "",
            "friendlyUrl": "",
            "note": ""
        }
    })
    const [imgValueArtical, setImgValueArtical] = useState('')
    const [showAtical, setShowAtical] = useState(false)

    const handleShowArtical = function (itemId) {
        setCreateArtical({
            'id': itemId,
            "title": "",
            "content": "",
            "banner": {
                "fileName": "",
                "filePath": "",
                "friendlyUrl": "",
                "note": ""
            }
        })

        setImgValueArtical('')
        setShowAtical(true);
    }
    const handleCreateArtical = async () => {
        console.log("data", createArtical.banner.fileName)
        console.log(createArtical)
        if (
            createArtical.title !== "",
            createArtical.shortDescription !== "",
            createArtical.content !== "",
            createArtical.friendlyUrl !== "",
            createArtical.banner.filePath !== ""
        ) {
            const data = {
                'id': createArtical.id,
                "title": createArtical.title,
                "content": createArtical.content,
                'friendlyUrl': MakeUrl(createArtical.title),
                // "friendlyUrl":createArtical.friendlyUrl,
                "banner": {
                    "fileName": createArtical.banner.fileName,
                    "filePath": createArtical.banner.filePath,
                    "friendlyUrl": createArtical.banner.friendlyUrl,
                    "note": createArtical.banner.note
                }

            }

            const respon = await articalApi.createArtical(data)
            if (respon.isSuccess) {
                Swal.fire("Tạo bài viết thành công")
                // setIsAccept(!isAccept)
                setShowAtical(false)
            }
            else {
                Swal.fire("tạo bài viết thất bại")
            }

        }
        else {
            Swal.fire("Vui lòng nhập đủ thông tin")
        }
    }
    const handleChangeAvatar = (e) => {
        setImgValueArtical(e.target.files[0])
    }


    useEffect(async () => {
        console.log("img", imgValueArtical)
        if (imgValueArtical !== '') {
            // kiểm tra định dạng ảnh
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValueArtical.name).slice((imgValueArtical.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if (resultimg) {
                let form = new FormData();
                // console.log(imgValue,'imgValue')
                form.append('Image', imgValueArtical);
                form.append('TypeImage', "new");

                const response = await projectApi.uploadFile(form);
                setCreateArtical({
                    ...createArtical, banner: {
                        "filePath": response.data.filePath,
                        "fileName": response.data.fileName,
                        "friendlyUrl": response.data.friendlyUrl,
                        "note": response.data.note
                    }
                })
                console.log(createArtical)
                if (response.isSuccess) {
                }
                else {
                    Swal.fire('upload ảnh thất bại')
                }
            }
            else {
                Swal.fire('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgValueArtical('')
            }
        }
    }, [imgValueArtical])


    // Xem bài viết
    const [showArticalDetail, setShowArticalDetail] = useState(false)

    const handleShowArticalDetail = (id) => {
        idProjectDetail = id
        setShowArticalDetail(true)
    }

    // Lịch sử giao dịch
    const [projectNameTransaction, setProjectNameTransaction] = useState('')
    const [projectIdTransaction, setProjectIdTransaction] = useState()
    const [showTransaction, setShowTransaction] = useState(false)
    const [pageindex, setPageindex] = useState(0)
    console.log("page index: ", pageindex)
    const [transactionValues, setTransactionValues] = useState([{

        amount: '',
        currency: "",
        hash: "",
        projectId: '',
        projectName: "",
        userAvatar: "\\uploads\\Images\\User_Avatars\\28042022_030444_anymous_icon.png",
        userName: ""
    }]
    )
    const handleShowTransaction = async (ProjectTitle, projectId) => {
        setProjectNameTransaction(ProjectTitle)
        setProjectIdTransaction(projectId)
        setShowTransaction(true)


    }
    useEffect(() => {
        const showTransaction = async () => {
            try {
                const params = {
                    projectid: projectIdTransaction,
                    pageindex
                }
                const respons = await projectApi.getTransaction(params)
                console.log("respons", respons)
                if (respons.isSuccess) {
                    setTransactionValues(respons.data)
                }
                else {
                    Swal.fire(`lấy dữ liệu lịch sử giao dịch thất bại`)
                }
            }
            catch (e) {
                console.error(e)
            }
        }
        showTransaction()
    }, [projectIdTransaction, pageindex]);
    console.log('follow: ', userInfo.projectFollow)
    // Theo dõi dự án
    // const handleFollow = async (id) => {
    //     const response = await clientUser.followProject(id)
    //     if (response.isSuccess) {
    //         setIsFollow(!isFollow)
    //     }
    // }
    const handleChangePassword = async (email) => {
        const responsi = await adminUser.changPassword(email)
        if (responsi.isSuccess) {

            Swal.fire(
                `${email}`,
                `Đăng nhập vào Email để tiến hành đổi mật khẩu`,
                'success'
            )


        }
        else {
            Swal.fire("Thất bại")
        }
    }
    return (
        <>

            {
                isLoading ? <Loading /> : (
                    <div className={clsx(Style.wrapProfile, "py-5")}>
                        <div className="container py-5">
                            <div className="row">
                                {/* Thông tin cá nhân  */}
                                <div className="col-12 col-lg-3">
                                    <div className={clsx(Style.userInfo, 'bg-white shadow p-4')}>
                                        <div className="w-100 text-center">
                                            <img src={process.env.REACT_APP_URL + userInfo.avatar} alt="" className="img-fluid rounded-3" />
                                        </div>
                                        <h2 className="text-center fs-3 py-3">{userInfo.fullName}</h2>
                                        <h3 className="text-center fs-4 fw-light ">{userInfo.type === 1 ? "Cá nhân" : "Tổ chức"}</h3>
                                        <hr></hr>
                                        <p><strong>Email:</strong> {userInfo.email}</p>
                                        <p><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</p>
                                        <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
                                        <div className="text-center pt-3">
                                            <button onClick={() => { handleShowEdit() }} className="bg-base-color px-4 py-2 rounded-3 text-white">Chỉnh sửa thông tin</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Danh sách dự án cá nhân  */}
                                <div className="col-12 col-lg-9 mt-4 mt-lg-0">

                                    <div className={clsx(Style.projectInfo, 'bg-white h-100 shadow p-4 d-flex flex-column justify-content-between')} style={{ minHeight: '500px' }}>
                                        <div className="text-center">
                                            <p className={clsx(Style.title, "d-inline-block  fs-2 fw-bold position-relative")}>Các dự án đã tạo</p>
                                        </div>
                                        <div className="table-responsive h-100">

                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th className={clsx(Style.tableTh)}>Tên dự án</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Ngày tạo</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Ngày kết thúc</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Số tiền cần (VNĐ)</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        projectList.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td >{item.title}</td>
                                                                <td className="text-end">{moment(item.createTime).format('DD/MM/YYYY')}</td>
                                                                <td className="text-end">{moment(item.endDate).format('DD/MM/YYYY')}</td>
                                                                <td className="text-end">{utils.formatNumber(item.amountNeed)}</td>
                                                                <td className=" text-center align-middle ">
                                                                    <Dropdown className="d-inline mx-2" >

                                                                        <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                            style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                            <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>

                                                                            <Dropdown.Item as={Link} to={"/project-detail/" + item.id + "/" + item.friendlyUrl} target="_blank"
                                                                                className={clsx(Style.itemDrop, "align-self-end  rounded-3  text-dark text-decoration-none")}
                                                                                onClick={() => { window.scrollTo(0, 0) }}>
                                                                                <i className="mdi mdi-window-restore "></i>

                                                                                Chi tiết
                                                                            </Dropdown.Item>
                                                                            {/* <Dropdown.Divider /> */}
                                                                            <Dropdown.Item as={Link} target="_blank" to={{ pathname: `/update-project/${item.id}/${item.friendlyUrl}`, state: locations }} className={clsx(Style.itemDrop, "align-self-end  rounded-3  text-dark text-decoration-none")}><i className="mdi mdi-lock-reset "></i>
                                                                                Sửa Dự Án
                                                                            </Dropdown.Item>


                                                                            <Dropdown.Item onClick={() => { handleShow(item.id) }} className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Tiến trình</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => { handleShowArtical(item.id) }} className={clsx(Style.itemDrop, "align-self-end  rounded-3  text-dark text-decoration-none")}>
                                                                                <i className="mdi mdi-plus-circle-outline"></i>
                                                                                Tạo bài viết
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => { handleShowArticalDetail(item.id) }} className={clsx(Style.itemDrop, "align-self-end  rounded-3  text-dark text-decoration-none")}>
                                                                                <i className="mdi mdi-window-restore "></i>
                                                                                Chi tiết bài viết
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => { handleShowTransaction(item.title, item.id) }} className={clsx(Style.itemDrop, "align-self-end  rounded-3  text-dark text-decoration-none")}>
                                                                                <i className="mdi mdi-swap-horizontal"></i>

                                                                                Xem lịch sử giao dịch
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>

                                                            </tr>
                                                        ))

                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="d-flex">
                                            <div>
                                                <button onClick={() => setCurrentpage(currentpage != 0 ? currentpage - 1 : currentpage)} className={clsx(Style.prevBtn, 'prevBtn  px-2')}>
                                                    <span className="mdi mdi-chevron-double-left"></span>
                                                </button>
                                                <span className="px-3 text-secondary">{currentpage}</span>
                                                <button onClick={() => setCurrentpage(currentpage + 1)} className={clsx(Style.nextBtn, 'nextBtn  px-2')}>
                                                    <span className="mdi mdi-chevron-double-right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                userInfo.projectFollow.length > 0 ? (
                                    <div className="row my-5 py-4 bg-white " style={{ borderRadius: "16px" }}>

                                        <div className="text-center">
                                            <p className={clsx(Style.title, "d-inline-block  fs-2 fw-bold position-relative")}>Các dự án đang theo dõi</p>
                                        </div>
                                        {
                                            userInfo.projectFollow.map((item, index) => (
                                                <div key={index} className={clsx(Style.projectItem, ' col-12  col-md-6 col-xxl-4 p-3 p-md-4')}>
                                                    <div className={clsx(Style.projectWrapItem, "bg-white overflow-hidden shadow d-flex flex-column")}>
                                                        <div className="w-100 ">
                                                            <img src={process.env.REACT_APP_URL + item.projectFollow.bannerPath}
                                                                className={clsx(Style.imgCard)} alt="hình ảnh dự án" />
                                                        </div>
                                                        <div className="p-3 d-flex flex-column flex-grow-1 justify-content-around " >
                                                            <Link to={"/project-detail/" + item.projectFollow.id + "/" + item.projectFollow.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.titleProject, "  my-2 text-decoration-none text-uppercase fs-5 fw-bold text-dark")}>{item.projectFollow.title}</Link>
                                                            <div className={clsx(Style.shortDescription)}>
                                                                <SetInnerHTML text={item.projectFollow.shortDescription} />
                                                            </div>
                                                            <div className="mt-4">

                                                                <div className="ProgressBarContent px-3 my-2  bg-light rounded-3">
                                                                    <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                                                    <ProgressBar striped now={Math.floor(((Number(item.projectFollow.amountNow)) / Number(item.projectFollow.amountTRXNeed)) * 100) + 10} label={`${Math.floor(((Number(item.projectFollow.amountNow)) / Number(item.projectFollow.amountTRXNeed)) * 100)} %`} />
                                                                    <span>{utils.formatNumber((Number(item.projectFollow.amountNow)).toFixed(2))} / {utils.formatNumber(item.projectFollow.amountTRXNeed)} TRX</span>
                                                                </div>
                                                                <div className="border-start px-3 py-1 my-2 d-flex flex-column ">
                                                                    <span ><i className="mdi mdi-history fs-5 pe-2"></i>Trạng thái</span>
                                                                    <span className={clsx(Style.baseColor, 'text-uppercase')}>{item.projectFollow.status === 1 ? "Đang chờ duyệt" : (item.projectFollow.status === 2 ? "Đang thực thi" : (item.projectFollow.status === 3 ? "Đã hoàn thành" : "Thất bại"))}</span>

                                                                </div>
                                                                {/* <div className='d-flex flex-column flex-xl-row align-items-center  justify-content-between '>
                                                                <div className="d-flex align-items-center ">
                                                                    <span><i className="mdi mdi-account-multiple-outline fs-5 me-1 "></i></span>
                                                                    <p className='text-decoration-none m-0 '>{item.projectFollow.userCreate}</p>
                                                                </div>
                                                                <Button onClick={handleFollow(item.projectFollow.id)} className={clsx(Style.backgroundForeignColor, 'px-5 my-2 w-100 text-light border-0')}><i className={clsx('mdi me-1', isFollow ? 'mdi-heart' : "mdi-heart-outline")}></i>{isFollow ? "Đang Theo dõi" : "Theo dõi"}</Button>

                                                                <Link to={"/project-detail/" + item.projectFollow.id + "/" + item.projectFollow.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted text-decoration-none bg-white px-4 py-2 fw-bold')}>Xem chi tiết</Link>
                                                            </div> */}
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </div>

                                ) :
                                    ""
                            }
                            <div className="row mt-4">
                                <div className="col-12">
                                    <div className={clsx(Style.projectInfo, 'bg-white h-100 shadow p-4 d-flex flex-column justify-content-between')} >
                                        <div className="text-center">
                                            <p className={clsx(Style.title, "d-inline-block  fs-2 fw-bold position-relative")}>Lịch sử đóng góp</p>
                                        </div>
                                        <div className="table-responsive ">

                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th className={clsx(Style.tableTh)}>Tên dự án</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Số tiền</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Loại tiền</th>
                                                        <th className={clsx(Style.tableTh, 'text-end')}>Thời gian</th>
                                                        <th className={clsx(Style.tableTh, 'text-center')}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        userTransaction.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td >{item.projectName.length > 35 ? item.projectName.slice(0, 50) + '...' : item.projectName}</td>
                                                                <td className="text-end">{item.amount}</td>
                                                                <td className="text-end">{item.currency}</td>
                                                                <td className="text-end">{moment.utc(item.createTime).local().format('DD/MM/YYYY hh:mm A')}</td>
                                                                <td className="text-end">
                                                                    <a href={"https://nile.tronscan.org/#/transaction/" + item.hash}
                                                                        target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center ")}>Chi tiết giao dịch</a>
                                                                </td>


                                                            </tr>
                                                        ))

                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* modal chọn tiến trình                        */}
                        <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chọn tiếng trình để sửa</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div id="process" className={clsx(Style.process, 'py-5')} >
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <h2>Tiến trình dự án</h2>
                                                <div className={clsx(Style.line)}><hr /></div>
                                            </div>
                                            <div className="col-12 col-lg-6 text-end border-end">
                                                <p className={clsx(Style.baseColor, 'm-0 fs-5')}>Mục tiêu của chúng tôi</p>
                                                <p className={clsx(Style.foreignColor, 'm-0')}>{utils.formatNumber(projectDetail.amountNeed)} VNĐ</p>
                                            </div>
                                        </div>

                                        {/* Tab content  */}
                                        <div id={clsx(Style.tabContent)} className="row ">
                                            <div className="col-12">
                                                <ul className="nav nav-pills my-5 flex-nowrap overflow-auto" id="pills-tab" role="tablist">
                                                    {
                                                        projectDetail.processes.map((item, index) => (
                                                            <li key={"nav-item" + index} className={clsx(Style.navItem, 'd-flex align-items-center ')} role="presentation">
                                                                <button className={clsx("bg-transparent px-3 px-lg-4  border  rounded-pill ", index === 0 ? "active" : "")} id={"pills-" + index + '-tab'} data-bs-toggle="pill" data-bs-target={"#pills-" + index} type="button" role="tab" aria-controls={"pills-" + index} aria-selected={index == 0 ? "true" : "false"}>
                                                                    <div style={{ borderBottom: "1px dashed #ccc" }} className="fw-bold text-white">
                                                                        {index + 1}
                                                                    </div>
                                                                    <div style={{ fontSize: '12px' }} className=" text-muted ">{utils.formatNumber(Number(item.amountNeed))}</div>
                                                                </button>
                                                                {index < projectDetail.processes.length - 1 ? <div className={clsx(Style.tabLine)}></div> : ""}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    {
                                                        projectDetail.processes.map((item, index, arr) => (
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
                                                                        //  
                                                                        <Link to={{
                                                                            pathname: `/update-process/${item.processId}`,
                                                                            state: item // chuyền dữ liệu qua Update-process
                                                                        }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} ><i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa tiến trình</Link>

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
                                                                                                        <a href={"https://tronscan.org/#/contract/" + projectDetail.addressContract} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, 'text-decoration-none')}>Xem trên Blockchain</a>
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
                                </div>
                            </Modal.Body>

                            <Modal.Footer>

                            </Modal.Footer>
                        </Modal>
                        {/* modal tạo bài viết */}
                        <Modal size="xl" show={showAtical} onHide={() => setShowAtical(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-black-50">Tạo bài viết</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="container-fluid ">
                                <div className="row p-3">
                                    <div className={clsx(Style.imgAccountUpdate, "col-4 me-end")}>

                                        <img className={clsx(Style.img_item1, "mx-auto d-block img-fluid")}
                                            src={(createArtical.banner.filePath).length > 0 ? process.env.REACT_APP_URL + createArtical.banner.filePath : imgDefault} alt="" />
                                        <div className="w-100 d-flex justify-content-end">
                                            <button className={clsx(Style.btnMoreImg, 'btn')}>
                                                <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình ảnh</span>
                                                <input type="file" onChange={handleChangeAvatar} style={{ cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                            </button>
                                        </div>

                                    </div>

                                    <Form className="col-8 ">
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Tên bài viết</Form.Label>
                                            <Form.Control className="border border-secondary"
                                                value={createArtical.title}
                                                onChange={(e) => { setCreateArtical({ ...createArtical, title: e.target.value }) }}
                                                type="text"
                                                placeholder="tiêu đề bài viết"
                                                autoFocus
                                            />
                                        </Form.Group>

                                        <Form.Group className="col-12 px-2 d-inline-block " controlId="">
                                            <Form.Label>Nội dung</Form.Label>
                                            <div className="add-project_editor removeImg">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={createArtical.content}

                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setCreateArtical({ ...createArtical, content: data })
                                                    }}
                                                    config={{

                                                        removePlugins: ['image', 'MediaEmbed', 'Table'],
                                                    }}

                                                />
                                            </div>

                                        </Form.Group>

                                    </Form>



                                </div>

                            </Modal.Body>

                            <Modal.Footer className="d-flex justify-content-end">

                                <div>
                                    <Button className="me-2" variant="secondary" onClick={() => setShowAtical(false)}>
                                        Đóng
                                    </Button>
                                    <Button style={{ backgroundColor: 'var(--nav-color)' }} onClick={() => { handleCreateArtical() }}>
                                        Tạo
                                    </Button>
                                </div>

                            </Modal.Footer>

                        </Modal>
                        {
                            (showArticalDetail) ? <ModalArticalDetai state={[showArticalDetail, setShowArticalDetail]} id={idProjectDetail} /> : null
                        }

                        {/* modal xem đóng góp */}
                        <Modal
                            size='xl'
                            show={showTransaction}
                            onHide={() => (setShowTransaction(false), setPageindex(0))}
                            backdrop="static"
                            keyboard={false}
                            centered
                        >
                            <div className="py-2 px-3">

                                <Modal.Title className="text-black-50">Lịch sử giao dịch của dự án: {projectNameTransaction}</Modal.Title>
                            </div>
                            {/* <Modal.Header closeButton>
                    </Modal.Header> */}
                            <Modal.Body>
                                <div className="table-responsive">

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >#</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Ảnh đại diện</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Người đóng góp</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Số tiền đóng góp</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Đơn vị tiền tệ</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Loại</th>
                                                <th scope="col" className={clsx(Style.lh, "text-center")} >Mã giao dịch</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactionValues.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>
                                                            <th className={clsx(Style.lh, "text-center")} scope="row">{index + 1}</th>
                                                            <td >
                                                                <div className={clsx(Style.imgAccount, " text-center mx-auto d-block")}>
                                                                    <img id="img-banner1" src={process.env.REACT_APP_URL + item.userAvatar}
                                                                        className={clsx(Style.img_item, " rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>

                                                            <td className={clsx(Style.lh, "text-center")} style={{ minWidth: '200px' }}>{item.userName}</td>
                                                            <td className={clsx(Style.titleshow, "text-center")} style={{ minWidth: '200px' }}>{item.amount}</td>
                                                            <td className={clsx(Style.lh, "text-center")} style={{ minWidth: '100px' }}>TRX</td>
                                                            <td className={clsx(Style.lh, "text-center")} style={{ minWidth: '100px' }}>{item.type === 1 ? "Đóng góp" : (item.type === 2 ? 'Hoàn tiền' : 'Rút tiền')}</td>
                                                            <td className={clsx(Style.hash, "text-center")} style={{ minWidth: '200px' }}>
                                                                <a href={"https://nile.tronscan.org/#/transaction/" + item.hash}
                                                                    target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}>Chi tiết giao dịch</a>

                                                            </td>
                                                        </tr>


                                                    )
                                                })
                                            }


                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex ">
                                    <div>
                                        <button onClick={() => (setPageindex(pageindex != 0 ? pageindex - 1 : pageindex),
                                            handleShowTransaction(projectNameTransaction, projectIdTransaction))} className={clsx(Style.prevBtn, 'prevBtn px-2')}>
                                            <span className="mdi mdi-chevron-double-left"></span>
                                        </button>
                                        <span className="px-3 text-secondary">{pageindex}</span>
                                        <button onClick={() => (setPageindex(pageindex + 1),
                                            handleShowTransaction(projectNameTransaction, projectIdTransaction))} className={clsx(Style.nextBtn, 'nextBtn px-2')}>
                                            <span className="mdi mdi-chevron-double-right"></span>
                                        </button>
                                    </div>
                                </div>
                            </Modal.Body>
                            <div className="d-flex justify-content-end pb-2 px-2">
                                <Button variant="secondary" className="" style={{ width: '150px' }} onClick={() => (setShowTransaction(false), setPageindex(0))}>
                                    Đóng
                                </Button>
                            </div>
                            {/* <Modal.Footer>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer> */}
                        </Modal>




                        {/* sửa thông tin người dùng  */}

                        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-black-50">Cập nhật thông tin cá nhân</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="container-fluid ">
                                <div className="row p-3">
                                    <div className={clsx(Style.imgAccountUpdate, "col-3 position-relative")}>

                                        <img className={clsx(Style.img_item, "rounded-circle position-relative border border-1 img-fluid img-auto-size")}
                                            src={process.env.REACT_APP_URL + userInfo.avatar} alt="" />
                                        <input type="file" className={clsx(Style.changeimg, 'position-absolute')} onChange={(e) => { handleChangAvatar(e) }} style={{ cursor: "pointer", opacity: "0", cursor: "pointer" }} />
                                    </div>

                                    <Form className="col-9 py-2">
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Họ tên</Form.Label>
                                            <Form.Control className="border border-secondary"
                                                value={userInfo.fullName}
                                                onChange={(e) => { setUserInfo({ ...userInfo, fullName: e.target.value }) }}
                                                type="text"
                                                placeholder="name"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control className="border border-secondary"

                                                value={userInfo.phoneNumber}
                                                onChange={(e) => { setUserInfo({ ...userInfo, phoneNumber: e.target.value }) }}
                                                type="text"
                                                placeholder="098765432"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control className="border border-secondary"

                                                value={userInfo.address}
                                                onChange={(e) => { setUserInfo({ ...userInfo, address: e.target.value }) }}
                                                type="text"
                                                placeholder="đồng nai/ vĩnh cửu/ thiện tân"
                                                autoFocus
                                            />
                                        </Form.Group>

                                    </Form>
                                    <Form className="d-flex justify-content-between col-12">
                                        <Form.Group className="col-6 px-2 d-inline-block " controlId="">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control className="border border-secondary"
                                                readOnly={true}
                                                value={userInfo.email}
                                                onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }}
                                                type="email"
                                                placeholder="email@gmail.com"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="col-6 px-2 d-inline-block " controlId="">
                                            <Form.Label>Loại</Form.Label>

                                            <Select
                                                isDisabled={true}
                                                value={HandleGetLable(type, userInfo.type)}

                                                onChange={setTypeCreate}
                                                options={type.slice(1)}
                                                defaultValue={type.slice(1)}
                                                className={clsx(Style.category, 'w-100')}
                                            ></Select>

                                        </Form.Group>

                                    </Form>

                                    {/* <Form className={clsx("d-flex justify-content-between col-12 ", (powerCreate === 3) ? 'hide' : "sleep")}>

                                        <Form.Group className="col-6 px-2 d-inline-block " controlId="">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control className="border border-secondary"
                                                readOnly={powerCreate === 3 ? true : false}
                                                value={userInfo.address}
                                                onChange={(e) => { setUserInfo({ ...userInfo, address: e.target.value }) }}
                                                type="text"
                                                placeholder="đồng nai/ vĩnh cửu/ thiện tân"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="col-6 px-2 d-inline-block " controlId="">
                                            <Form.Label>Mật Khẩu</Form.Label>
                                            <Form.Control className="border border-secondary"
                                                readOnly={powerCreate === 3 ? true : false}
                                                value={userInfo.password}
                                                onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }}
                                                type="password"
                                                placeholder="tối thiểu 6 ký tự"
                                                autoFocus
                                            />

                                        </Form.Group>


                                    </Form> */}
                                </div>

                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between">
                                <div>
                                    <Button className={clsx("bg-danger")}
                                        style={{ backgroundColor: 'var(--love-color-4) !important' }}
                                        onClick={() => { handleChangePassword(userInfo.email) }}>

                                        Đổi mật khẩu
                                    </Button>
                                </div>
                                <div>
                                    <Button className="me-2" variant="secondary" onClick={handleCloseEdit}>
                                        Đóng
                                    </Button>
                                    <Button style={{ backgroundColor: 'var(--nav-color)' }} onClick={() => { handleUpdateUser() }}>
                                        Cập nhật
                                    </Button>
                                </div>

                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            }
        </>

    );
}

export default ClientProfile;