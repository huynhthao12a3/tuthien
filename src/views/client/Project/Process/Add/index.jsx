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
import { useHistory, useLocation } from "react-router-dom";
import projectApi from "../../../../../api/Project";
import Dropdown from 'react-bootstrap/Dropdown'
import { DocTienBangChu } from "../../../../../utils/utils"
import moment from 'moment';
import swal from "sweetalert";


function AddProcess(props) {
    // ----- tronweb
    const tronweb = window.tronWeb;
    const HttpProvider = tronweb.providers.HttpProvider;
    tronweb.eventServer = new HttpProvider("https://nile.trongrid.io")

    //---------------------------------------------------------------------------giá trị khởi tạo
    const location = useLocation().pathname;
    const projectObj = props.location.state
    console.log("projectObj", projectObj)
    console.log(moment(projectObj.enddate).utc().format())
    const history = useHistory()

    //------------------------------------------------------------------------------------- useState
    const [listProcessValue, setListProcessValue] = useState([])
    const [urlPath, setUrlPath] = useState([])
    const [title, setTitle] = useState('')
    const [shortDescription, setshortDescription] = useState('')
    const [content, setContent] = useState('')
    const [amountNeed, setAmountNeed] = useState(0)
    const [imgValue, setImgValue] = useState([])
    const [indexProcess, setIndexProcess] = useState(-1)
    const [amountWord, setAmountWord] = useState('')

    //--------------------------------------------------------------------------------- useEffect

    useEffect(() => {
        setAmountWord(DocTienBangChu(amountNeed))
    }, [amountNeed])

    useEffect(() => {
        console.log("listProcessValue", listProcessValue)

    }, [listProcessValue])

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

    const [trxPrice, setTrxPrice] = useState();
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
            .then(res => res.json())
            .then(res => { setTrxPrice(res.tron.vnd) })
    }, [])
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
            shortDescription !== ""
            && amountNeed > 0) {
            setListProcessValue([...listProcessValue, {
                title,
                shortDescription,
                amountNeed,
            }])
            setTitle('')
            setshortDescription('')
            setAmountNeed(0)
            setIndexProcess(-1)
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
    }

    // cập nhật process

    const handleUpdateProcess = () => {
        if (title !== "" && shortDescription !== "" && amountNeed > 0) {
            const arrProcess = [...listProcessValue]
            arrProcess[indexProcess] = {

                title,
                shortDescription,
                amountNeed,
            }
            setListProcessValue(arrProcess)
            setTitle('')
            setshortDescription('')
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

    // xóa process
    const HandleDeleteProcess = (index) => {
        alertify.confirm('Thông báo', 'bạn có chắc muốn xóa tiến trình này',
            function () {
                const arr1 = [...listProcessValue.slice(0, index), ...listProcessValue.slice(index + 1)]
                setListProcessValue(arr1)
                alertify.success('xóa thành công')
            },
            function () {
                alertify.error('đã hủy xóa')

            });
    }

    // đẩy lên Api

    const handleCreateProject = () => {
        if (!!window.tronWeb === false) {
            swal({
                title: "Thông báo",
                text: "Vui lòng cài đặt TronLink để tạo dự án.",
                icon: "info",
                button: {
                    className: "bg-base-color"
                }
            });
        } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
            // alertify.alert("Vui lòng đăng nhập TronLink để tạo dự án.")
            swal({
                title: "Thông báo",
                text: "Vui lòng đăng nhập TronLink để tạo dự án.",
                icon: "info",
                button: {
                    className: "bg-base-color"
                }
            });
        } else {
            handleFinal();
        }
    }
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
                "endDate": moment(projectObj.enddate).utc().format(),
                "addressContract": "string",
                "amountNeed": listProcessValue.reduce(function (total, number) {
                    return total + number.amountNeed
                }, 0),
                "process": listProcessValue.map(function (item) {
                    return ({
                        "title": item.title,
                        "shortDescription": item.shortDescription,
                        "content": '',
                        "amountNeed": item.amountNeed,
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

                // alertify.alert('Tạo dự án thành công')
                createProjectSM(response.data)
            }
            else {
                // alertify.alert('Tạo dự án thất bại')
                swal({
                    title: "Tạo dự án thất bại",
                    icon: "error",
                    button: {
                        className: "bg-base-color"
                    }
                });
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    // Tạo dự án trên Smart Contract 
    async function createProjectSM(id) {

        // Quy đổi VND -> SUN (1 TRX = 1.000.000 SUN)
        const amountNeedVnd = listProcessValue.reduce(function (total, number) {
            return total + number.amountNeed
        }, 0);
        const amountNeedSun = Math.round((amountNeedVnd / trxPrice) * 1000000)
        console.log('SUN: ', amountNeedSun);

        const transaction = await tronweb.transactionBuilder.createSmartContract({
            abi: process.env.REACT_APP_ABI,
            bytecode: process.env.REACT_APP_BYTECODE,
            feeLimit: 400000000,
            callValue: 0,
            userFeePercentage: 100,
            originEnergyLimit: 1000000,
            parameters: [1, 123]
        }, tronweb.defaultAddress.hex);

        const signedTransaction = await tronweb.trx.sign(transaction)

        const contractInstance = await tronweb.trx.sendRawTransaction(signedTransaction)



        // const sm = await tronweb.contract().at(process.env.REACT_APP_SMART_CONTRACT_ADDRESS)
        // let result = await sm.CreateProject(id, 'huynhthao@gmail.com', amountNeedSun).send()
        //     .then((res) => {
        //         console.log('CreateProject: ', res)
        //         if (typeof res === 'string') {
        //             swal({
        //                 title: "Tạo dự án thành công",
        //                 icon: "success",
        //                 button: {
        //                     className: "bg-base-color"
        //                 }
        //             });
        //             history.push(`/project-detail/${id}/${projectObj.projecturl}`)

        //         }

        //     })

    }
    return (
        <>

            <div className={clsx(Style.main)}>
                <div id='nava' className="container-fluid p-4 mx-auto p-md-5 ">

                    <div className={clsx('row pt-3')}>
                        <div className="col-12 col-md-9">
                            <h3 className={clsx(Style.title_content, "pb-3")}>Thêm tiến trình</h3>

                            <div className={clsx(Style.information_wrap, 'row p-2 p-md-4 mb-3')}>
                                <h5>Thông tin</h5>
                                <div className={clsx('col-12 pt-1 pt-md-3 ')}>

                                    <label htmlFor="nameProject">Tiêu đề</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                </div>
                                <div className={clsx(Style.editor, ' add-project_editor col-12 pt-3 removeImg')}>


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

                                </div>
                                <div className={clsx('col-12 pt-3 ')}>

                                    <label htmlFor="nameProject">Số tiền cần thiết (VND)</label>
                                    <input value={amountNeed} onChange={(e) => {
                                        if (Number.isFinite(Number(e.target.value))) {
                                            setAmountNeed(Number(e.target.value))

                                        }
                                    }} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                    <span className={clsx(Style.wrap_amountWord, 'mt-2 d-inline-block font-weight-bold')}>Thành tiền :
                                        <span className={clsx(Style.amountWord, 'text-danger')}> {amountWord} </span>
                                    </span>
                                </div>
                                <div className='d-flex justify-content-end container'>
                                    <button href="nava" onClick={handleAddProcess} className={clsx(Style.createbtn, 'btn me-2')}>Thêm</button>
                                    <button href="nava" onClick={handleUpdateProcess} className={clsx(Style.createbtn, 'btn updateProcess')}>Cập Nhật</button>

                                </div>

                            </div>


                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className={clsx(Style.title_content, "pb-3")} >Danh sách tiến trình</h3>
                            <div className={clsx(Style.process_list, 'row ms-md-2')}>
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
                                                            <tr className={clsx(Style.itemProcess, "cursor-pointer")} >
                                                                <th onClick={() => { calbackGetProcess(index) }}>{index}</th>
                                                                <th onClick={() => { calbackGetProcess(index) }}>{item.title}</th>
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
                                <button href="nava" onClick={handleCreateProject} className={clsx(Style.Btnfinal, 'btn')}>Hoàn thành</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default AddProcess