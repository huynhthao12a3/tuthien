import Style from "./News.module.scss"
import clsx from "clsx"
import { margin, style } from "@mui/system"
import React, { Component, useEffect, useState } from 'react'

import 'rsuite/dist/rsuite-rtl.min.css'
import { MakeUrl, removeUnicode } from '../../../utils/utils';
import Dropdown from 'react-bootstrap/Dropdown'
import * as $ from "jquery"
import Select from 'react-select'
import { Link } from "react-router-dom";
import categoryApi from "../../../api/Category";
import projectApi from "../../../api/Project";
import moment from "moment";
import { ar } from "date-fns/locale";
import newsApi from "../../../api/News"
import { Button, Modal, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from "../../../shares/Loading"
import Swal from "sweetalert2"

let isCreate = false
function AdminNews() {
    const imgDefault = "\\uploads\\Images\\project\\02052022_043453_default-image-620x600.jpg"
    //-------------------------------------------------------
    const arr = [
        {
            "id": 1,
            "title": "cứu trợ miền trung",
            "category": 1,
            "createTime": '23/09/2021',
            "status": 2,
        },
    ]
    const objNew = {
        "title": "",
        "shortDescription": "",
        "content": "",
        "friendlyUrl": "",
        "banner": {
            "filePath": "",
        }
    }
    const filterStatus = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'Chờ duyệt' },
        { value: '2', label: 'Đã duyệt' },
    ]
    const imgFormat = ['gif', 'png', 'tiff', 'raw', 'psd', 'jpg']

    //--------------------------------------------------------------------------------------------------------useState
    const [categoryOptions, setCategoryOptions] = useState([{ value: 0, label: 'Tất cả' }])
    const [isLoading, setIsLoading] = useState(true)
    const [arrayNews, setArrayNews] = useState(arr)
    const [inputSearch, setInputSearch] = useState('')
    const [inputCategoty, setInputCategoty] = useState(categoryOptions[0])
    const [inputStatus, setInputStatus] = useState(filterStatus[0])
    const [pageindex, setPageindex] = useState(0)
    const [imgValue, setImgValue] = useState('')
    const [show, setShow] = useState(false);
    const [reLoad, setReload] = useState(true)
    const [selected, setSelected] = useState([]);// lưu các giá trị danh mục
    const [createNews, setCreateNews] = useState(objNew)
    // const categoryOptionsCreat=[...categoryOptions.slice(1)]
    //--------------------------------------------------------------------------------------------------- useEffect
    // get api 
    useEffect(async () => {
        const params = {
            "keyword": inputSearch,
            'categoryid': inputCategoty.value,
            "pageindex": pageindex,
            "status": inputStatus.value
        }
        const respon = await newsApi.getAll(params)
        if (respon.isSuccess) {
            setIsLoading(false)
            setArrayNews(respon.data)
        }
        else {
            Swal.fire("lỗi load dữ liệu")
        }
    }, [inputSearch, inputCategoty, inputStatus, pageindex, reLoad])

    useEffect(async () => {
        const respon = await categoryApi.getall(2)
        setCategoryOptions([...[{ value: 0, label: 'Tất cả' }], ...respon.data.map(function (item) {
            return {
                value: item.id,
                label: item.categoryName
            }
        })])
    }, [])

    useEffect(() => {
        setCreateNews({ ...createNews, friendlyUrl: MakeUrl(createNews.title) })
    }, [createNews.title])

    useEffect(async () => {
        if (imgValue !== '') {
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            if (resultimg) {
                let form = new FormData();
                form.append('Image', imgValue);
                form.append('TypeImage', "new");
                const response = await projectApi.uploadFile(form);
                if (response.isSuccess) {
                    setCreateNews({ ...createNews, banner: { filePath: response.data.filePath } })
                }
                else {
                    Swal.fire('Upload ảnh thất bại')
                }
            }
            else {
                Swal.fire('Chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgValue('')
            }
        }
    }, [imgValue])

    //----------------------------------------------------------------------------------funtion
    // xử lý hiện labe  
    function HandleGetLable(filter, id) {
        return (
            filter.find(function (itemCategoty) {
                if (itemCategoty.value === (id + '')) {
                    return itemCategoty
                }
            })
        )
    }
    // upload ảnh lên
    const handleChangAvatar = (e) => {
        setImgValue(e.target.files[0])
    }


    const handleClose = () => {
        if (isCreate) {
            setCreateNews(objNew)
            setImgValue('')
            setSelected([])
        }
        setShow(false)
    };
    const handleShow = async function (id) {
        if (isCreate) {
            const respon = await newsApi.get(id)
            if (respon.isSuccess) {
                setCreateNews({
                    "id": id,
                    'status': respon.data.status,
                    "title": respon.data.title,
                    "shortDescription": respon.data.shortDescription,
                    "content": respon.data.content,
                    "friendlyUrl": respon.data.friendlyUrl,
                    "banner": {
                        "filePath": respon.data.bannerPath,
                    }
                })
                setSelected(respon.data.category.map((item) => {
                    {
                        return {
                            value: item.categoryId,
                            label: item.categoryName
                        }
                    }
                }))
            }
        }
        // else{
        //     setCreateNews(objNew)
        //     setImgValue('')
        // }
        setShow(true);
    }
    // thêm sửa 
    const handleCreate = async () => {
        if (
            createNews.title !== "",
            createNews.shortDescription !== "",
            createNews.content !== "",
            createNews.friendlyUrl !== "",
            createNews.banner.filePath !== ""
        ) {
            if (isCreate) {
                const data = {
                    "id": createNews.id,
                    "title": createNews.title,
                    "status": createNews.status,
                    "shortDescription": createNews.shortDescription,
                    "content": createNews.content,
                    "friendlyUrl": createNews.friendlyUrl,
                    "banner": {
                        "fileName": createNews.banner.filePath.slice(createNews.banner.filePath.lastIndexOf("\\") + 1),
                        "filePath": createNews.banner.filePath,
                        "friendlyUrl": createNews.banner.filePath.slice(createNews.banner.filePath.lastIndexOf("\\") + 1),
                        "note": "new-path"
                    },
                    "category": selected.map(function (item) {
                        return ({
                            "categoryId": item.value
                        })
                    }),

                }
                const respon = await newsApi.update(data)
                if (respon.isSuccess) {
                    Swal.fire("Chỉnh sửa bảng tin thành công")
                    setReload(!reLoad)
                    setSelected([])
                    handleClose()
                }
                else {
                    Swal.fire("Chỉnh sửa bảng tin thất bại")
                }
            }
            else {
                const data = {
                    "title": createNews.title,
                    "shortDescription": createNews.shortDescription,
                    "content": createNews.content,
                    "friendlyUrl": createNews.friendlyUrl,
                    'status': 1,
                    "banner": {
                        "fileName": imgValue.name,
                        "filePath": createNews.banner.filePath,
                        "friendlyUrl": imgValue.name,
                        "note": imgValue.name
                    },
                    "category": selected.map(function (item) {
                        return ({
                            "categoryId": item.value
                        })
                    }),
                }

                const respon = await newsApi.createNews(data)
                if (respon.isSuccess) {
                    setSelected('')

                    Swal.fire("Tạo bảng tin thành công")
                    setCreateNews(objNew)
                    setImgValue('')
                    setReload(!reLoad)
                    handleClose()
                }
                else {
                    Swal.fire("tạo bảng tin thất bại")
                }
            }
        }
        else {
            Swal.fire("Vui lòng nhập đủ thông tin")
        }
    }
    // xóa 
    const handleDelete = (id) => {
        const accept = async () => {
            const respon = await newsApi.delete(id)
            if (respon.isSuccess) {
                Swal.fire("Xoá bài viết thành công")
                setReload(!reLoad)
            }
            else {
                Swal.fire("Xoá bài viết thất bại")
            }
        }
        Swal.fire({
            title: 'Bạn có Chắc?',
            text: "Bạn muốn xóa bài viết này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--nav-color)',
            cancelButtonColor: 'var(--love-color-4)',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if (result.isConfirmed) {
                accept()
            }
        })
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
                            <h3 className={clsx(Style.titleProject)}>Quản lý bảng tin</h3>
                            <button onClick={() => {
                                isCreate = false
                                handleShow(1)
                            }} className={clsx(Style.btnCreateProject, "btn")}>
                                <span className="mdi mdi-plus-circle pe-2"></span> Tạo bảng tin </button>
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
                                <h5 className={clsx(Style.searchContent, '')}>Danh mục</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputCategoty} onChange={setInputCategoty} className={clsx(Style.Inputfocus)} placeholder='danh mục' options={categoryOptions} />
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
                            <div className="page-aside-right  h-100 d-flex flex-column justify-content-between">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tiêu đề</th>
                                                <th scope="col">Ngày Tạo</th>
                                                <th scope="col">Ngày đăng</th>
                                                <th scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayNews.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row">{index + 1}</th>

                                                            <td className={clsx(Style.titleshowa)}>{item.title.length > 30 ? (item.title.slice(0, 30) + '...') : item.title}</td>
                                                            <td >{moment(item.createTime).format("DD/MM/YYYY")}</td>

                                                            <td >{moment(item.createTime).format("DD/MM/YYYY")}</td>
                                                            <td >
                                                                <span className={clsx(Style.StatusItem, 'position-relative', item.status === 1 ? 'waitingStatus' : (item.status === 2 ? 'doneStatus' : 'doingStatus'))}>{HandleGetLable(filterStatus, item.status).label}

                                                                </span>
                                                            </td>

                                                            <td key={index + 'dropdow'} className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item as={Link} to={"/admin/news/" + item.id + "/" + MakeUrl(item.title)} target="_blank" className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>
                                                                            Chi tiết</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item onClick={() => handleDelete(item.id)} className={clsx(Style.itemDrop)}><i className="mdi mdi-delete"></i>
                                                                            Xoá</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item onClick={() => {
                                                                            isCreate = true
                                                                            handleShow(item.id)
                                                                        }} className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>
                                                                            Sửa bảng tin</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}

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
                <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-black-50">{!isCreate ? 'Tạo' : 'Sửa'} bảng tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container-fluid ">
                        <div className="row p-3">
                            <div className={clsx(Style.imgAccountUpdate, "col-12 me-end")}>

                                <img className={clsx(Style.img_item1, "mx-auto d-block img-fluid")}
                                    src={(createNews.banner.filePath) ? process.env.REACT_APP_URL + createNews.banner.filePath : process.env.REACT_APP_URL + imgDefault} alt="" />
                                <div className="w-100 d-flex justify-content-end">
                                    <button className={clsx(Style.btnMoreImg, 'btn')}>
                                        <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                                        <input type="file" onChange={handleChangAvatar} style={{ cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                    </button>
                                </div>

                            </div>

                            <Form className="col-12 py-2">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tên bài viết</Form.Label>
                                    <Form.Control className="border border-secondary"
                                        value={createNews.title}
                                        onChange={(e) => { setCreateNews({ ...createNews, title: e.target.value }) }}
                                        type="text"
                                        placeholder="tiêu đề bài viết"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Đường dẫn</Form.Label>
                                    <Form.Control className="border border-secondary"
                                        value={createNews.friendlyUrl}
                                        onChange={(e) => { setCreateNews({ ...createNews, friendlyUrl: e.target.value }) }}
                                        type="text"
                                        placeholder="đường dẫn"
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Mô tả ngắn</Form.Label>
                                    <Form.Control className="border border-secondary"

                                        value={createNews.shortDescription}
                                        onChange={(e) => { setCreateNews({ ...createNews, shortDescription: e.target.value }) }}
                                        type="text"
                                        placeholder="mô tả ngắn"
                                        autoFocus
                                    />
                                </Form.Group>
                                <div className='col-12 mt-3 w-100'>
                                    <label>Danh mục</label>
                                    <Select value={selected} onChange={setSelected} className={clsx(Style.category, 'w-100')} options={[...categoryOptions.slice(1)]} defaultValue={[...categoryOptions.slice(1)]} isMulti />
                                </div>

                            </Form>
                            <Form className="d-flex justify-content-between col-12">
                                <Form.Group className="col-12 px-2 d-inline-block " controlId="">
                                    <Form.Label>Nội dung</Form.Label>
                                    <div className="add-project_editor removeImg">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={createNews.content}

                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setCreateNews({ ...createNews, content: data })
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
                            <Button className="me-2" variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button className={clsx("", isCreate ? 'hide' : 'show')} variant="primary" onClick={() => { handleCreate() }}>
                                Tạo
                            </Button>
                            <Button className={clsx("", !isCreate ? 'hide' : 'show')} variant="primary" onClick={() => { handleCreate() }} >
                                Hoàn thành
                            </Button>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export default AdminNews