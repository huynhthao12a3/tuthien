import Style from "./Add.module.scss"
import default_img from "../../../../../assets/images/default_image.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import clsx from "clsx"
import React, { Component, useEffect, useState } from 'react'
import 'rsuite/dist/rsuite-rtl.min.css'
import * as $ from "jquery"
import Select from 'react-select'
import { set } from "date-fns";
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useLocation } from "react-router-dom";
import projectApi from "../../../../../api/Project";
import Dropdown from 'react-bootstrap/Dropdown'

function AddProcess(props) {

    //---------------------------------------------------------------------------giá trị khởi tạo
    const location = useLocation().pathname;
    const projectObj = props.location.state

    //------------------------------------------------------------------------------------- useState
    const [listProcessValue, setListProcessValue] = useState([])
    const [urlPath, setUrlPath] = useState([])
    const [title, setTitle] = useState('')
    const [shortDescription, setshortDescription] = useState('')
    const [content, setContent] = useState('')
    const [amountNeed, setAmountNeed] = useState(0)
    const [imgValue, setImgValue] = useState([])
    const [indexProcess, setIndexProcess] = useState(-1)
    // const [inputStatus,setInputStatus]= useState(1)// lưu trạng thái tạm
    // const [listFile,setListFile]=useState([])

    //--------------------------------------------------------------------------------- useEffect
    useEffect(() => {
        console.log("listProcessValue", listProcessValue)

    }, [listProcessValue])

    useEffect(() => {
        const btntMoreImg = $('.btntMoreImg')
        const btndeleteImg = $('.btndeleteImg')
        if (location === "/add-process") {
            btntMoreImg.addClass('disabled')
            btndeleteImg.addClass('disabled')
        }
        else {
            if (imgValue.length >= 5) { btntMoreImg.addClass('disabled') }
            else { btntMoreImg.removeClass('disabled') }
            if (imgValue.length >= 1) { btndeleteImg.removeClass('disabled') }
            else { btndeleteImg.addClass('disabled') }
        }
    }, [imgValue])

    useEffect(() => {
        const btnUpdate = $('.updateProcess')
        if (Number(indexProcess) >= 0) {
            btnUpdate.removeClass('disabled')
        }
        else {
            btnUpdate.addClass('disabled')
        }
        console.log("indexProcess", indexProcess)
    }, [indexProcess])
    //------------------------------------------------------------------------ function

    // xử lý hiện ảnh lên màn hình
    const handleMoreImg = (e) => {
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
        setImgValue([...imgValue, file])
    }

    // xóa hình ảnh
    const handleDeleteImg = () => {
        var arr = [...imgValue]
        arr.pop()
        setImgValue(arr)
    }

    // xử lý thêm process vào danh sách 
    const handleAddProcess = () => {
        if (
            title !== "" &&
            shortDescription !== "" &&
            content !== "" && amountNeed > 0) {
            setListProcessValue([...listProcessValue, {
                title,
                shortDescription,
                content,
                amountNeed,
            }])
            setTitle('')
            setshortDescription('')
            setContent('')
            setAmountNeed(0)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            alertify.alert('Thông báo', `Thêm tiến trình vào dự án  ${projectObj.projectname}  thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `Thêm tiến trình vào dự án  ${projectObj.projectname}  thất bại !`);
        }

    }

    // lấy item của danh sách
    const calbackGetProcess = (index) => {
        setIndexProcess(index)
        setAmountNeed(listProcessValue[index].amountNeed)
        setTitle(listProcessValue[index].title)
        setshortDescription(listProcessValue[index].shortDescription)
        setContent(listProcessValue[index].content)
    }

    // cập nhật process
    const handleUpdateProcess = () => {
        if (
            title !== "" &&
            shortDescription !== "" &&
            content !== "" && amountNeed > 0) {
            const arrProcess = [...listProcessValue]
            arrProcess[indexProcess] = {
                title,
                shortDescription,
                content,
                amountNeed,
            }
            setListProcessValue(arrProcess)
            setTitle('')
            setshortDescription('')
            setContent('')
            setAmountNeed(0)
            setIndexProcess(-1)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            alertify.alert('Thông báo', `Sửa tiến trình của dự án  ${projectObj.projectname}  thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `Sửa tiến trình của dự án  ${projectObj.projectname}  thất bại !`);
        }

    }
    const HandleDeleteProcess = (index) => {
        alertify.confirm('Confirm Title', 'Confirm Message',
            function () {
                alertify.success('Ok')
            },
            function () {
                alertify.error('Cancel')
            });
    }
    // đẩy lên Api
    const handleFinal = async () => {

        try {
            const data = {
                "title": projectObj.projectname,
                "shortDescription": projectObj.description,
                "projectStatus": 1,
                "friendlyUrl": projectObj.projecturl,
                "summary": projectObj.summary,
                "problemToAddress": projectObj.problem,
                "solution": projectObj.solution,
                "location": projectObj.address,
                "impact": projectObj.target,
                "endDate": projectObj.endDate,
                "addressContract": "string",
                "amountNeed": listProcessValue.reduce(function (total, number) {
                    return total + number.amountNeed
                }, 0),
                "process": listProcessValue.map(function (item) {
                    return ({
                        "title": item.title,
                        "shortDescription": item.shortDescription,
                        "content": item.content,
                    })
                }),
                "category": (projectObj.category).map(function (item) {
                    return ({
                        "categoryId": Number(item)
                    })
                }),
                "banner": {
                    "fileName": projectObj.urlImg.fileName,
                    "filePath": projectObj.urlImg.filePath,
                    "friendlyUrl": projectObj.urlImg.friendlyUrl,
                    "note": projectObj.urlImg.note
                }

            }
            const response = await projectApi.createProject(data);
            console.log(response.data)
            if (response.isSuccess) {
                alertify.alert('Tạo dự án thành công')
            }
            else {
                alertify.alert('Tạo dự án thất bại')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={clsx(Style.main)}>
                <div id='nava' className="container-fluid p-5 ">

                    <div className={clsx('row pt-3')}>
                        <div className="col-12 col-md-9">
                            <h3 className={clsx(Style.title_content, "pb-3")}>Thêm tiến trình</h3>
                            <div className={clsx(Style.img_wrap, 'row')}>
                                <h5 style={{ fontSize: '1.2rem' }}>Hình Ảnh</h5>

                                <div className="col-2">
                                    {/* imgAvatar.review ?imgAvatar.review: */}
                                    <img id="img-banner" src={imgValue.length > 0 ? imgValue[0].review : default_img} className={clsx(Style.img_item, "img-auto-size")} />
                                </div>

                                <div className="col-2">
                                    {/* imgAvatar.review ?imgAvatar.review: */}
                                    <img id="img-banner" src={imgValue.length > 1 ? imgValue[1].review : default_img} className={clsx(Style.img_item, "img-auto-size")} />
                                </div>
                                <div className="col-2">
                                    {/* imgAvatar.review ?imgAvatar.review: */}
                                    <img id="img-banner" src={imgValue.length > 2 ? imgValue[2].review : default_img} className={clsx(Style.img_item, "img-auto-size")} />
                                </div>
                                <div className="col-2">
                                    {/* imgAvatar.review ?imgAvatar.review: */}
                                    <img id="img-banner" src={imgValue.length > 3 ? imgValue[3].review : default_img} className={clsx(Style.img_item, "img-auto-size")} />
                                </div>
                                <div className="col-2">
                                    {/* imgAvatar.review ?imgAvatar.review: */}
                                    <img id="img-banner" src={imgValue.length > 4 ? imgValue[4].review : default_img} className={clsx(Style.img_item, "img-auto-size")} />
                                </div>

                                <div className="col-2 position-relative">
                                    <div className='w-100 h-100 d-flex justify-content-end flex-column align-items-center '>
                                        <button onClick={handleDeleteImg} className={clsx(Style.btnLessImg, 'btndeleteImg btn')}>
                                            xóa
                                        </button>
                                        <button className={clsx(Style.btnMoreImg, 'btntMoreImg btn')}>
                                            <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Thêm ảnh</span>
                                            <input onChange={handleMoreImg} className="imputImg" type="file" style={{ display: "inline-block", cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(Style.information_wrap, 'row p-4')}>
                                <h5>Thông tin</h5>
                                <div className={clsx('col-12 pt-3 ')}>

                                    <label htmlFor="nameProject">Tiêu đề</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                </div>
                                <div className={clsx('col-12 pt-3')}>
                                    {/* <div className={clsx(Style.editor,' add-project_editor removeImg')}> */}
                                    <label htmlFor="nameProject">Mô tả ngắn (shortDescriptiona)</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={shortDescription}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setshortDescription(data)

                                        }}
                                        config={{

                                            removePlugins: ['MediaEmbed', 'Table'],
                                        }}
                                    />
                                    {/* </div> */}

                                </div>
                                <div className={clsx('col-12 pt-3')}>

                                    <div className={clsx(Style.editor, ' add-project_editor removeImg')}>
                                        <label htmlFor="nameProject">Nội dung</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={content}

                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContent(data)

                                            }}
                                            config={{
                                                // extraPlugins: [uploadPlugin],
                                                removePlugins: ['image', 'MediaEmbed', 'Table'],
                                            }}

                                        />
                                    </div>

                                </div>
                                <div className={clsx('col-12 pt-3 ')}>

                                    <label htmlFor="nameProject">Số tiền cần thiết (VND)</label>
                                    <input value={amountNeed} onChange={(e) => {
                                        if (Number.isFinite(Number(e.target.value))) {
                                            setAmountNeed(Number(e.target.value))

                                        }
                                    }} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                </div>
                                <div className='d-flex justify-content-end container'>
                                    <button href="nava" onClick={handleAddProcess} className={clsx(Style.createbtn, 'btn me-2')}>Thêm</button>
                                    <button href="nava" onClick={handleUpdateProcess} className={clsx(Style.createbtn, 'btn updateProcess')}>Cập Nhật</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 col-12 ">
                            <h3 className={clsx(Style.title_content, "pb-3")} >Danh sách tiến trình</h3>
                            <div className={clsx(Style.process_list, 'row ')}>
                                <h5 className="pt-2 ps-3" style={{ color: "#666", fontSize: "1.1rem" }}>Tên dự án : {projectObj.projectname}</h5>
                                <div className="col-12 ps-2 pe-2">
                                    <table className="table">
                                        <thead>
                                            <tr style={{ color: "#666", fontSize: "0.857rem" }}>
                                                <th scope="col">#</th>
                                                <th scope="col">Tiêu đề</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listProcessValue.map(function (item, index) {
                                                    return (
                                                        <>
                                                            <tr className={clsx(Style.itemProcess, "cursor-pointer")} onClick={() => { calbackGetProcess(index) }}>
                                                                <th>{index}</th>
                                                                <th>{item.title}</th>
                                                                <td className=" text-center align-middle ">
                                                                    <Dropdown className="d-inline mx-2" >
                                                                        <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}>
                                                                            <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18  text-primary")}></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                            <Dropdown.Item onClick={() => { HandleDeleteProcess(index) }} className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore pe-2"></i>Xóa</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className='d-flex justify-content-end container'>
                                <button href="nava" onClick={handleFinal} className={clsx(Style.Btnfinal, 'btn')}>Hoàn thành</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default AddProcess