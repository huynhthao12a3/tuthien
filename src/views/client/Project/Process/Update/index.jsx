import Style from "./Update.module.scss"
import default_img from "../../../../../assets/images/default_image.png"
import clsx from "clsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { DocTienBangChu, removeUnicode } from "../../../../../utils/utils";
import * as $ from "jquery"
import Select from 'react-select'
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Dropdown from 'react-bootstrap/Dropdown'
import processApi from "../../../../../api/Process";
import swal from "sweetalert";



function UpdateProcess(props) {

    //-------------------------------------------------------- giá trị khởi tạo
    // const locations = useLocation().pathname
    // let location= locations.slice(locations.indexOf("project/")+1,locations.lastIndexOf("/"))
    // location=location.slice(location.lastIndexOf("/")+1)


    // const location = useLocation().pathname.slice(useLocation().pathname.lastIndexOf("/") + 1);
    let locationsq = useLocation().pathname.slice(1)
    locationsq = locationsq.slice(0, locationsq.indexOf("/"))
    console.log("locationsq", locationsq)

    const { id } = useParams()
    console.log('id: ', id)
    const imgFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const fileFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg', 'pdf', 'doc', 'docx']
    const processProp = props.location.state
    console.log('processProp', props)
    const history = useHistory()
    console.log('history: ', history.location)
    const listTypeExpen = [
        { value: '1', label: 'Thanh toán' },
    ]
    const listStatusProcess = [
        // { value: '0', label: 'Trạng thái' },
        { value: '1', label: 'Chưa bắt đầu' },
        { value: '2', label: 'Đang thực thi' },
        { value: '3', label: 'Đã hoàn thành' }
    ]
    //---------------------------------------------------------- hook
    const [processValue, setProcessValue] = useState(processProp)
    console.log('value: ', processValue)
    const [imgValue, setImgValue] = useState('')
    const [uploadFileValue, setUploadFileValue] = useState('')
    const [fileValue, setFileValue] = useState('')
    const [indexExpense, setIndexExpense] = useState(-1)
    const [listImgUgl, setListImgUgl] = useState(processProp.listImages
        // processProp.listImages.map(function(item){
        //     return({
        //         id:item.fileId,
        //         filePath:item.filePath,
        //         friendlyUrl:item.filePath.slice(item.filePath.lastIndexOf("\\")),
        //         note:"Banner Project"
        //     })
        // })
    )
    console.log(listImgUgl)
    // expense
    const [description, setDescription] = useState('')
    const [typeEpen, setTypeEpen] = useState(listTypeExpen[0]);
    const [statusProcess, setStatusProcess] = useState(listStatusProcess[processValue.status - 1]);
    const [amountNeed, setAmountNeed] = useState(0)
    const [amountWord, setAmountWord] = useState('')
    const [listExpense, setListExpense] = useState(processProp.expenses.map(function (item) {
        return ({
            id: item.expenseId,
            description: item.description,
            typepen: typeEpen,
            amount: item.amount,
        })
    }))

    //---------------------------------------------------------- useEffect
    useEffect(() => {
        console.log("listExpense", listExpense)
    }, [listExpense])

    // đẩy ảnh lên API
    useEffect(async () => {
        if (imgValue !== '') {
            // kiểm tra định dạng ảnh
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if (resultimg) {

                let form = new FormData();
                form.append('Image', imgValue);
                form.append('TypeImage', "process");
                const response = await processApi.uploadFile(form);
                console.log("response.data", response.data)
                setListImgUgl([...listImgUgl, { fileId: 0, ...response.data }])
                if (response.isSuccess) {
                }
                else {
                    alertify.alert('upload ảnh thất bại')
                }
            }
            else {
                alertify.alert('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgValue('')
            }
        }
    }, [imgValue])

    // Upload hóa đơn process 
    const uploadFileBill = (e) => {
        setUploadFileValue(e.target.files[0])
    }

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         let form = new FormData();
    //         form.append('Image', uploadFileValue);
    //         form.append('TypeImage', "process-bill");
    //         const response = await processApi.uploadFile(form);
    //         if (response.isSuccess) {
    //             setFileValue(response.data)
    //         }
    //         else {
    //             alertify.alert('Upload ảnh thất bại. Vui lòng kiểm tra định dạng ảnh.')
    //         }
    //     }
    //     fetchImage()
    // }, [uploadFileValue])

    useEffect(async () => {
        if (uploadFileValue !== '') {
            // kiểm tra định dạng file
            let resultimg = fileFormat.find(function (item) {
                return removeUnicode((uploadFileValue.name).slice((uploadFileValue.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if (resultimg) {

                let form = new FormData();
                form.append('Image', uploadFileValue);
                form.append('TypeImage', "process-bill");
                const response = await processApi.uploadFile(form);
                console.log("response.data", response.data)
                if (response.isSuccess) {
                    setFileValue(response.data)
                }
                else {
                    alertify.alert('Upload file thất bại')
                }
            }
            else {
                alertify.alert('Chỉ nhận file có đuôi là jpeg, gif, png, tiff, raw, psd, pdf, doc, docx')
                setUploadFileValue('')
            }
        }
    }, [uploadFileValue])

    useEffect(() => {
        const btnUpdate = $('.updateProcess')
        if (Number(indexExpense) >= 0) {
            btnUpdate.removeClass('disabled')
        }
        else {
            btnUpdate.addClass('disabled')
        }
    }, [indexExpense])

    useEffect(() => {
        setAmountWord(DocTienBangChu(amountNeed))
    }, [amountNeed])

    useEffect(() => {
        const btntMoreImg = $('.btntMoreImg')
        const btndeleteImg = $('.btndeleteImg')
        if (listImgUgl.length >= 5) { btntMoreImg.addClass('disabled') }
        else { btntMoreImg.removeClass('disabled') }
        if (listImgUgl.length >= 1) { btndeleteImg.removeClass('disabled') }
        else { btndeleteImg.addClass('disabled') }

    }, [imgValue])

    //---------------------------------------------------------- function

    // xử lý hiện ảnh lên màn hình
    const handleMoreImg = (e) => {
        setImgValue(e.target.files[0])
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
    }

    // xóa hình ảnh
    const handleDeleteImg = () => {

        var arr = [...listImgUgl]
        arr.pop()
        console.log(arr)
        setListImgUgl(arr)
    }

    // thêm expense vào danh sách
    const handleAddProcess = () => {
        if (description !== "" && typeEpen !== "" && amountNeed > 0) {
            setListExpense([...listExpense, {
                id: 0,
                description,
                typepen: typeEpen,
                amount: amountNeed,
                file: {
                    id: 0,
                    ...fileValue
                }
            }])

            setDescription('')
            setTypeEpen(listTypeExpen[0])
            setAmountNeed(0)
            setIndexExpense(-1)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            alertify.alert('Thông báo', `Thêm chi tiêu vào tiến trình  ${processValue.title}  thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `Thêm chi tiêu vào tiến trình ${processValue.title}  thất bại !`);
        }
    }


    // lấy item của danh sách
    const calbackGetProcess = (index) => {
        setDescription(listExpense[index].description)
        setTypeEpen(listTypeExpen[0])
        setAmountNeed(listExpense[index].amount)
        setIndexExpense(index)
    }

    // cập nhật expense
    const handleUpdateProcess = () => {
        if (description !== "" && typeEpen !== "" && amountNeed > 0) {
            const arrExpense = [...listExpense]

            arrExpense[indexExpense] = {
                id: 0,
                description,
                typepen: typeEpen,
                amount: amountNeed,
                file: {
                    id: 0,
                    ...fileValue
                }
            }
            setListExpense(arrExpense)
            setDescription('')
            setTypeEpen(listTypeExpen[0])
            setAmountNeed(0)
            setFileValue('')
            setIndexExpense(-1)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            alertify.alert('Thông báo', `sửa bảng chi tiêu của tiến trình ${processValue.title}  thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `sửa bảng chi tiêu của tiến trình ${processValue.title}  thất bại !`);
        }
    }

    // xóa process
    const HandleDeleteProcess = (index) => {
        alertify.confirm('Thông báo', 'Bạn có chắc muốn xóa tiến trình này',
            function () {
                const arr1 = [...listExpense.slice(0, index), ...listExpense.slice(index + 1)]
                setListExpense(arr1)
                alertify.success('Xóa thành công')
            },
            function () {
                alertify.error('Đã hủy xóa')
            });
    }
    // up lên API
    const handleFinal = async () => {

        try {
            const data = {
                "id": id,
                "title": processValue.title,
                "shortDescription": processValue.shortDescription,
                "content": processValue.content,
                "status": Number(statusProcess.value),
                "expenses": listExpense.map(function (item) {
                    return ({
                        "id": item.id,
                        "description": item.description,
                        "type": item.typepen.label,
                        "amount": item.amount,
                        "file": item.file
                    })
                })
                ,
                "files": listImgUgl.map(function (item, index) {
                    return ({
                        "id": item.fileId,
                        "fileName": item.fileName,
                        "filePath": item.filePath,
                        "friendlyUrl": item.friendlyUrl,
                        "note": item.note
                    })
                })

            }

            const response = await processApi.editProcess(data);
            if (response.isSuccess) {
                // alertify.alert('Tạo dự án thành công')
                swal({
                    title: "Thông báo",
                    text: "Cập nhật tiến trình thành công.",
                    icon: "success",
                    button: {
                        className: "bg-base-color"
                    }
                });
                if (locationsq.includes("admin")) {
                    console.log(1)
                    history.push('/admin/project')
                }
                else {
                    history.push('/project')
                }
            }
            else {
                // alertify.alert('Tạo dự án thất bại')
                swal({
                    title: "Thông báo",
                    text: "Thêm tiến trình thất bại.",
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
    return (
        <>
            <div className={clsx(Style.main)}>
                <div id='nava' className="container-fluid p-2 p-md-5 ">

                    <div className={clsx('row pt-3')}>
                        <div className="col-12 ">
                            <h3 className={clsx(Style.title_content, " px-md-4")}>Cập nhật tiến trình </h3>
                            {/* hình ảnh */}
                            <div className={clsx(Style.img_wrap, 'row p-2 py-4 p-md-4 mx-1 m-md-3')}>
                                <h5 style={{ fontSize: '1.2rem' }}>Hình Ảnh</h5>
                                <div className="col-4 col-md-2">
                                    <img id="img-banner1" src={listImgUgl.length > 0 ? process.env.REACT_APP_URL + listImgUgl[0].filePath : default_img} className={clsx(Style.img_item, " img-fluid img-auto-size  mt-1")} />
                                </div>
                                <div className="col-4 col-md-2">
                                    <img id="img-banner2" src={listImgUgl.length > 1 ? process.env.REACT_APP_URL + listImgUgl[1].filePath : default_img} className={clsx(Style.img_item, "img-fluid img-auto-size  mt-1")} />
                                </div>
                                <div className="col-4 col-md-2">
                                    <img id="img-banner3" src={listImgUgl.length > 2 ? process.env.REACT_APP_URL + listImgUgl[2].filePath : default_img} className={clsx(Style.img_item, "img-fluid  img-auto-size  mt-1")} />
                                </div>
                                <div className="col-6 col-md-2">
                                    <img id="img-banner4" src={listImgUgl.length > 3 ? process.env.REACT_APP_URL + listImgUgl[3].filePath : default_img} className={clsx(Style.img_item, "img-fluid mx-auto d-block img-auto-size  mt-1")} />
                                </div>
                                <div className="col-6 col-md-2">
                                    <img id="img-banner5" src={listImgUgl.length > 4 ? process.env.REACT_APP_URL + listImgUgl[4].filePath : default_img} className={clsx(Style.img_item, "img-fluid mx-auto d-block img-auto-size  mt-1")} />
                                </div>

                                <div className="col-12 col-md-2 position-relative mt-2 m">
                                    <div className='w-100 h-100 d-flex justify-content-end flex-column align-items-center '>
                                        <button onClick={handleDeleteImg} className={clsx(Style.btnLessImg, 'btndeleteImg btn  mt-1 mt-md-2 py-1 py-md-2')}>
                                            Xóa
                                        </button>
                                        <button className={clsx(Style.btnMoreImg, 'btntMoreImg btn  mt-1  py-1 ')}>
                                            <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Thêm ảnh</span>
                                            <input onChange={handleMoreImg} className="imputImg" type="file" style={{ display: "inline-block", cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* thông tin */}
                            <div className={clsx(Style.information_wrap, 'row  p-2 py-4 p-md-4 mx-1 m-md-3')}>
                                <h5>Thông tin</h5>
                                {/* tên tiến trình */}
                                <div className={clsx('col-12 pt-3 ')}>
                                    <label htmlFor="nameProject">Tên tiến trình</label>
                                    <input value={processValue.title} onChange={(e) => setProcessValue({ ...processValue, title: e.target.value })} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                </div>
                                {/* mô tả ngắn tiến trình  */}
                                <div className={clsx('col-12 pt-3')}>
                                    <div className={clsx(Style.editor, ' removeImg')}>
                                        <label htmlFor="nameProject">Mô tả ngắn tiến trình</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={processValue.shortDescription}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setProcessValue({ ...processValue, shortDescription: data })
                                            }}
                                            config={{
                                                removePlugins: ['image', 'MediaEmbed', 'Table'],
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* nội dung tiến trình */}
                                <div className={clsx('col-12 pt-3')}>
                                    <div className={clsx(Style.editor, ' add-project_editor removeImg')}>
                                        <label htmlFor="nameProject">Nội dung tiến trình</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={processValue.content}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setProcessValue({ ...processValue, content: data })
                                            }}
                                            config={{
                                                removePlugins: ['image', 'MediaEmbed', 'Table'],
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Trạng thái  */}
                                <div className={clsx('col-12 pt-3 ')}>
                                    <label >Trạng thái tiến trình</label>
                                    <div className="form-group">
                                        <Select defaultValue={statusProcess} onChange={setStatusProcess} className={clsx(Style.Inputfocus)} placeholder='Trạng thái' options={listStatusProcess} />
                                    </div>
                                </div>

                            </div>

                            {/* danh sách  */}

                        </div>
                    </div>

                    <div className={clsx("row pe-md-1  p-1 py-4 p-md-1 mx-1 m-md-3")}>

                        <div className="col-md-9 col-12">
                            <h3 className={clsx(Style.title_content, "pb-md-3 pb-1")} >Chi tiêu</h3>
                            {/* chi tiêu */}
                            <div className={clsx(Style.expense_wrap, 'row p-2 p-md-4')}>

                                {/* mô tả ngắn phần chi tiêu */}
                                <div className={clsx('col-12 pt-3')}>
                                    <div className={clsx(Style.editor, ' add-project_editor removeImg')}>
                                        <label htmlFor="nameProject">Mô tả ngắn cho phần chi tiêu</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data)
                                            }}
                                            config={{
                                                removePlugins: ['image', 'MediaEmbed', 'Table'],
                                            }}
                                        />
                                    </div>
                                    {/* Hóa đơn  */}
                                    <div className={clsx('col-12 pt-3 ')}>
                                        <label >Hóa đơn chi tiêu</label>
                                        <div className="form-group">
                                            <input onChange={(e) => uploadFileBill(e)} name="bill" type="file" accept="image/jpeg,image/jpg,image/gif,image/png,application/pdf,application/doc,application/docx"></input>
                                        </div>
                                    </div>
                                    {/* hình thức chi tiêu  */}
                                    <div className={clsx('col-12 pt-3 ')}>
                                        <label >Hình thức chi tiêu</label>
                                        <div className="form-group">
                                            <Select defaultValue={typeEpen} onChange={setTypeEpen} className={clsx(Style.Inputfocus)} placeholder='loại' options={listTypeExpen} />
                                        </div>
                                    </div>
                                    {/* sô tiền đã dùng */}
                                    <div className={clsx('col-12 pt-3 ')}>
                                        <label htmlFor="amound">Số tiền đã dùng (VND)</label>
                                        <input id='amound' value={amountNeed} onChange={(e) => {
                                            if (Number.isFinite(Number(e.target.value))) {
                                                setAmountNeed(Number(e.target.value))
                                            }
                                        }} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} type="text" />
                                        <span className={clsx(Style.wrap_amountWord, 'mt-2 d-inline-block font-weight-bold')}>Thành tiền :
                                            <span className={clsx(Style.amountWord, 'text-danger')}> {amountWord} </span>
                                        </span>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-end container'>

                                    <button href="nava" onClick={handleAddProcess} className={clsx(Style.createbtn, 'btn me-2')}>Thêm</button>
                                    <button href="nava" onClick={handleUpdateProcess} className={clsx(Style.createbtn, 'btn updateProcess')}>Cập Nhật</button>
                                    {/* onClick={handleUpdateProcess} className={clsx(Style.createbtn,'btn updateProcess')} */}
                                    {/* <button href="nava">Cập Nhật</button> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-12 mt-2 ">
                            <h3 className={clsx(Style.title_content, "pb-1  pd-md-3 mt-md-1 mt-3")} >Danh sách tiến trình</h3>
                            <div className={clsx(Style.process_list, 'row ms-md-3 mt-md-3')}>
                                {/* {projectObj.projectname} */}
                                <h5 className="pt-2 ps-3" style={{ color: "#666", fontSize: "1.1rem" }}>Tên tiến trình: {processProp.title}</h5>
                                <div className="col-12 ps-2 pe-2">
                                    <table className="table">
                                        <thead>
                                            <tr style={{ color: "#666", fontSize: "0.857rem" }}>
                                                <th scope="col">#</th>
                                                <th scope="col">Số tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listExpense.map(function (item, index) {
                                                    return (
                                                        <tr key={index} className={clsx(Style.itemProcess, "cursor-pointer")} >
                                                            <th onClick={() => { calbackGetProcess(index) }}>{index}</th>
                                                            <th onClick={() => { calbackGetProcess(index) }}>{item.amount}</th>
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

                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end container'>

                                <button onClick={handleFinal} href="nava" className={clsx(Style.Btnfinal, 'btn')}>Hoàn thành</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default UpdateProcess