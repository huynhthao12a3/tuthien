import Style from "./Account.module.scss"
import clsx from "clsx"
import { margin, style } from "@mui/system"
import React, { Component, useEffect, useState } from 'react'
import DateRangePicker from 'rsuite/DateRangePicker';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import 'rsuite/dist/rsuite-rtl.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { removeUnicode } from "../../../utils/utils";
import * as $ from "jquery"
import Select from 'react-select'
import { Link } from "react-router-dom";
import moment from "moment";
import { ar } from "date-fns/locale";
import Loading from "../../../shares/Loading"
import adminUser from "../../../api/User/Admin"
import { Button, Modal, Form } from "react-bootstrap";
import Swal from 'sweetalert2'

let powerCreate = 1
function AdminAccount() {

    const imgFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const avatarDefalt = "\\uploads\\Images\\Hide_User\\06052022_080221_anymous_icon.png"
    // danh sách tạm
    const arr = [
        {
            "id": 0,
            "fullName": "",
            "email": '',
            "phoneNumber": '',
            "type": 1,
            'status': 2,
            "avatar": '',
            "address": '',
            'password': '',
            'isAdmin': true
        },
    ]
    const type = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'Cá nhân' },
        { value: '2', label: 'Tổ chức' },
    ]
    // select trạng thái
    const filterStatus = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'Khóa' },
        { value: '2', label: 'Đang hoạt động' },
    ]
    //---------------------------------------------------------useState

    const [arrayUsers, setArrayUsers] = useState(arr)// danh sách user
    const [userDetail, setUserDetail] = useState(arr[0])// 1 user

    // bộ lọc
    const [inputSearch, setInputSearch] = useState('')
    const [inputType, setInputType] = useState([...type][0])
    const [inputStatus, setInputStatus] = useState(filterStatus[0])
    const [pageindex, setPageindex] = useState(0)// trang 

    const [sta, setSta] = useState(1)// load lại danh sách


    const [typeCreate, setTypeCreate] = useState([...type][1])// selector trạng thái


    const [imgValue, setImgValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false)

    //------------------------------------------------------------useEffect

    //load danh sách từ API
    useEffect(async () => {
        const data = {
            "type": inputType.value,
            "keyword": inputSearch,
            "status": inputStatus.value,
            'pageindex': pageindex,
        }

        const respons = await adminUser.getAll(data)
        if (respons.isSuccess) {
            setIsLoading(false)
            setArrayUsers(respons.data)
        }
        else {
            Swal.fire("lỗi")
        }

    }, [inputSearch, inputType, inputStatus, pageindex, sta])

    //đẩy ảnh lên API
    useEffect(async () => {
        if (imgValue !== '') {
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            if (resultimg) {
                let form = new FormData();
                form.append('Image', imgValue);
                form.append('TypeImage', "user");
                const response = await adminUser.uploadFile(form);
                setUserDetail({ ...userDetail, avatar: response.data.filePath })
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

    useEffect(() => {
        setUserDetail({ ...userDetail, type: typeCreate.value })
    }, [typeCreate])


    //------------------------------------------------------funtion

    // xử lý hiện labe của 'type' 
    function HandleGetLable(filterlist, index) {
        return (
            filterlist.find(function (itemCategoty) {
                if (itemCategoty.value === (index + '')) {
                    return itemCategoty
                }
            })
        )
    }

    const handleChangAvatar = (e) => {
        setImgValue(e.target.files[0])
    }

    // xử lý khóa, mở khóa tài khoản
    const handleblockAcount = (content, item) => {
        const func = async () => {
            const respon = await adminUser.lock(item)
            if (respon.isSuccess) {
                Swal.fire(
                    `Đã ${content}!`,
                    `${content} tài khoản thành công`,
                    'success'
                )
                setSta(sta * (-1))
            }
            else {
                Swal.fire(
                    'khóa thất bại!',
                    `${content} tài khoản thất bại`,
                    'error'
                )
            }
        }
        Swal.fire({
            title: 'Bạn có chắc?',
            text: `Bạn muốn ${content} tài khoản người dùng này!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--nav-color)',
            cancelButtonColor: "var(--love-color-4)",
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if (result.isConfirmed) {
                func()
            }
        })
    }
    // xử lý xóa tài khoản
    const handleDelete = (id) => {
        const DeleteApiFunc = async () => {
            const respon = await adminUser.delete(id)
            if (respon.isSuccess) {
                setSta(sta * (-1))
                handleClose()
                Swal.fire(
                    'Đã xóa!',
                    'Xóa tài khoản thành công',
                    'success'
                )
            }
            else {
                Swal.fire(
                    'xóa thất bại!',
                    'Xóa tài khoản thất bại',
                    'error'
                )
            }

        }
        Swal.fire({
            title: 'Bạn có Chắc?',
            text: "Bạn muốn xóa tài khoản người dùng này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--nav-color)',
            cancelButtonColor: 'var(--love-color-4)',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteApiFunc()
            }
        })
    }


    const handleClose = () => setShow(false);

    // chọn loại tài khoản muốn tạo
    const handleChosePosition = function (item) {

        Swal.fire({
            title: 'Bạn muốn tạo tài khoản',
            text: "Cho Admin hay cho Client?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'var(--nav-color)',
            cancelButtonColor: 'var(--love-color-1)',
            confirmButtonText: 'Admin',
            cancelButtonText: 'Client'
        }).then((result) => {
            if (result.isConfirmed) {
                powerCreate = 1
                handleShow(item, 'Tạo tài Khoản Admin')
            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                powerCreate = 2
                handleShow(item, 'Tạo tài Khoản Client')

            }
        })

    }

    // hiển thị modal 

    const handleShow = function (item, content) {
        console.log(powerCreate)
        if (powerCreate === 3) {
            console.log('sadsadsadsadas')
            setUserDetail({ ...item, content: content })
        }
        else {
            setImgValue('')
            setUserDetail({
                "fullName": "",
                "email": '',
                "phoneNumber": '',
                "type": 2,
                "avatar": '',
                'content': content,
                'address': '',
                'password': ''
            })
        }
        setShow(true);
    }

    // Cập nhật tài khoản lên API

    const handleUpdateUser = async () => {
        if (
            userDetail.fullName !== '' &&
            userDetail.phoneNumber !== '' &&
            userDetail.email !== '') {
            if (powerCreate == 3) {
                const data = {
                    'id': userDetail.id,
                    "fullName": userDetail.fullName,
                    "phoneNumber": userDetail.phoneNumber,
                    "avatarPath": userDetail.avatar,
                    "email": userDetail.email,
                    "address":userDetail.address,
                    "type": Number(typeCreate.value)
                }
                const respon = await adminUser.updateUser(data)
                if (respon.isSuccess) {
                    handleClose()
                    setSta(sta * (-1))
                    Swal.fire('Cập nhật thông tin thành công')
                }
                else {
                    Swal.fire('Cập nhật thông tin thất bại')
                }
            }
            else if (powerCreate === 1) {
                if (userDetail.address !== '' && userDetail.password !== '') {
                    // tạo tài khoản admin
                    const dataAdmin = {
                        "fullName": userDetail.fullName,
                        "phoneNumber": userDetail.phoneNumber,
                        "avatarPath": userDetail.avatar,
                        "password": userDetail.password,
                        "email": userDetail.email,
                        "address": userDetail.address,
                        "type": Number(typeCreate.value)
                    }
                    const responAdmin = await adminUser.registerAdmin(dataAdmin)
                    if (responAdmin.isSuccess) {
                        handleClose()
                        setSta(sta * (-1))
                        Swal.fire('Đăng ký tài khoản Admin thành công')
                    }
                    else {
                        Swal.fire('Đăng ký tài khoản Admin thất bại')
                    }
                }
                else {
                    Swal.fire('Vui lòng điển đủ thông tin')
                }
            }
            else if (powerCreate === 2) {
                // tạo tài khaorn client
                if (userDetail.address !== '' && userDetail.password !== '') {
                    const dataClient = {
                        "fullName": userDetail.fullName,
                        "phoneNumber": userDetail.phoneNumber,
                        "avatarPath": userDetail.avatar,
                        "password": userDetail.password,
                        "email": userDetail.email,
                        "address": userDetail.address,
                        "type": Number(typeCreate.value)
                    }
                    const responAdmin = await adminUser.register(dataClient)
                    if (responAdmin.isSuccess) {
                        handleClose()
                        setSta(sta * (-1))
                        Swal.fire('Đăng ký tài khoản Client thành công')
                    }
                    else {
                        Swal.fire('Đăng ký tài khoản Client thất bại')
                    }
                }
                else {
                    Swal.fire('Vui lòng điển đủ thông tin')
                }
            }
        }
        else {
            Swal.fire('Vui lòng điển đủ thông tin')
        }
    }
    return (
        <div className="flex-grow-1">
            {
                isLoading ? <Loading /> : ""
            }
            <div className={clsx(Style.project, "main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý tài khoản người dùng</h3>
                            <span onClick={() => {
                                handleChosePosition(userDetail)
                            }} className={clsx(Style.btnCreateProject, "btn")}>
                                <span className="mdi mdi-plus-circle pe-2"></span> Tạo tài khoản người dùng </span>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent, '')}>Tìm kiếm</h5>
                                <div className="form-group">
                                    <input value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')} placeholder="Tìm theo tên bảng tin" autoComplete="off" />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Loại</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputType} onChange={setInputType} className={clsx(Style.Inputfocus)} placeholder='danh mục' options={type} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx(Style.Inputfocus)} placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>
                        <div className={clsx(Style.listPoject, 'h-100')}>
                            <div className="page-aside-right h-100 d-flex flex-column justify-content-between">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">Hình ảnh</th>
                                                <th scope="col">Họ tên</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Điện thoại</th>
                                                <th className="text-center" scope="col">Loại</th>
                                                <th className="text-center" scope="col">Chức vụ</th>
                                                <th className="text-center" scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayUsers.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                <div className={clsx(Style.imgAccount, "col-4 col-md-2 mx-auto")}>
                                                                    <img id="img-banner1" src={
                                                                        (imgFormat.includes(item.avatar.slice(item.avatar.indexOf('.') + 1))) ? (process.env.REACT_APP_URL + item.avatar) : (process.env.REACT_APP_URL + avatarDefalt)} className={clsx(Style.img_item, "rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>



                                                            <td className={clsx(Style.lh,)} >{item.fullName}</td>
                                                            <td className={clsx(Style.lh,)} >{item.email}</td>

                                                            <td className={clsx(Style.lh,)} >{item.phoneNumber}</td>
                                                            <td className={clsx(Style.lh, "text-center")} >{HandleGetLable(type, item.type).label}</td>
                                                            <td className={clsx(Style.lh, "text-center", item.isAdmin ? 'text-warning' : 'text-primary')} >{item.isAdmin ? 'Admin' : 'Client'}</td>
                                                            <td className={clsx(Style.lh, "text-center")} >
                                                                <span className={clsx(Style.StatusItem, 'position-relative', item.status === 1 ? 'waitingStatus' : (item.status === 2 ? ' doingStatusUse' : 'doingStatusUse'))}>{HandleGetLable(filterStatus, item.status).label}

                                                                </span>

                                                            </td>

                                                            <td className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2 " >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item onClick={() => {

                                                                            powerCreate = 3
                                                                            handleShow(item, 'Chỉnh sửa thông tin người dùng')
                                                                        }} className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>

                                                                            Chi tiết
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleblockAcount('mở khóa', item.id)} className={clsx(Style.itemDrop, item.status === 1 ? "show" : "hide")} ><i className={clsx("mdi mdi-lock-reset")}></i>
                                                                            Mở khóa tài khoản
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleblockAcount('khóa', item.id)} className={clsx(Style.itemDrop, item.status === 1 ? "hide" : "show")} >
                                                                            <i class="mdi mdi-block-helper"></i>

                                                                            Khóa tài khoản
                                                                        </Dropdown.Item>

                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>


                                                        </tr>

                                                    )
                                                })
                                            }


                                        </tbody>
                                    </table>

                                </div>
                                <div className="d-flex">
                                    <div>
                                        <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-left"></span>
                                        </button>
                                        <span className="px-3 text-secondary">{pageindex}</span>
                                        <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-right"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-black-50">{userDetail.content}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container-fluid ">
                        <div className="row p-3">
                            <div className={clsx(Style.imgAccountUpdate, "col-3 position-relative")}>

                                <img className={clsx(Style.img_item, "rounded-circle position-relative border border-1 img-fluid img-auto-size")}
                                    src={(imgFormat.includes(userDetail.avatar.slice(userDetail.avatar.indexOf('.') + 1))) ? (process.env.REACT_APP_URL + userDetail.avatar) : (process.env.REACT_APP_URL + avatarDefalt)} alt="" />
                                <input type="file" className={clsx(Style.changeimg, 'position-absolute')} onChange={(e) => { handleChangAvatar(e) }} style={{ cursor: "pointer", opacity: "0", cursor: "pointer" }} />
                            </div>

                            <Form className="col-9 py-2">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control className="border border-secondary"
                                        value={userDetail.fullName}
                                        onChange={(e) => { setUserDetail({ ...userDetail, fullName: e.target.value }) }}
                                        type="text"
                                        placeholder="name"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control className="border border-secondary"

                                        value={userDetail.phoneNumber}
                                        onChange={(e) => { setUserDetail({ ...userDetail, phoneNumber: e.target.value }) }}
                                        type="text"
                                        placeholder="098765432"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control className="border border-secondary"

                                        value={userDetail.address}
                                        onChange={(e) => { setUserDetail({ ...userDetail, address: e.target.value }) }}
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
                                        readOnly={powerCreate === 3 ? true : false}
                                        value={userDetail.email}
                                        onChange={(e) => { setUserDetail({ ...userDetail, email: e.target.value }) }}
                                        type="email"
                                        placeholder="email@gmail.com"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="col-6 px-2 d-inline-block " controlId="">
                                    <Form.Label>Loại</Form.Label>

                                    <Select
                                        isDisabled={powerCreate === 3 ? true : false}
                                        value={HandleGetLable(type, userDetail.type)}

                                        onChange={setTypeCreate}
                                        options={type.slice(1)}
                                        defaultValue={type.slice(1)}
                                        className={clsx(Style.category, 'w-100')}
                                    ></Select>

                                </Form.Group>
                               

                            </Form>

                            <Form className={clsx("d-flex justify-content-between col-12 ")}>
                               
                               
                                <Form.Group className={clsx('col-6 px-2 d-inline-block',(powerCreate === 3) ? 'hide' : "sleep")} controlId="">
                                    <Form.Label>Mật Khẩu</Form.Label>
                                    <Form.Control className="border border-secondary"
                                        readOnly={powerCreate === 3 ? true : false}
                                        value={userDetail.password}
                                        onChange={(e) => { setUserDetail({ ...userDetail, password: e.target.value }) }}
                                        type="password"
                                        placeholder="tối thiểu 6 ký tự"
                                        autoFocus
                                    />

                                </Form.Group>


                            </Form>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-between">
                        <div>

                            <Button className={clsx("bg-danger", (powerCreate !== 3) ? 'hide' : "sleep")}
                                style={{ backgroundColor: 'var(--love-color-4) !important' }}
                                onClick={() => { handleDelete(userDetail.id) }}>

                                Xóa
                            </Button>
                        </div>
                        <div>
                            <Button className="me-2" variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button style={{ backgroundColor: 'var(--nav-color)' }} onClick={() => { handleUpdateUser() }}>
                                {powerCreate === 3 ? 'Cập Nhật' : 'Tạo'}
                            </Button>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export default AdminAccount