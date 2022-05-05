import Style from "./Category.module.scss"
import clsx from "clsx"

import React, { useEffect, useState } from 'react'
import 'rsuite/dist/rsuite-rtl.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Select from 'react-select'
import categoryApi from "../../../api/Category";
import Swal from "sweetalert2";
import { Button, Modal, Form } from "react-bootstrap";
import { ar } from "date-fns/locale";
let powerCreate=1
function AdminCategory()
{
    const imgDefault = "\\uploads\\Images\\project\\02052022_043453_default-image-620x600.jpg"
     //-------------------------------------------------------
    const arr=[
        {
        "id": 1,
        "categoryName": "thiên tai",
        },
    ]
    const filterType = [
        { value: '1', label: 'Dự án' },
        { value: '2', label: 'Tin tức' },
    ]


    //-------------------------------useState
    const [sta, setSta] = useState(1)// load lại danh sách
    const [arrCategoryProjects, setArrCategoryProjects] = useState(arr)
    const [category, setCategory] = useState({
        "categoryName": "",
        "icon": {
          "fileName": "",
          "filePath": "",
          "friendlyUrl": "",
          "note": ""
        },
        "type": 0
      })

    const [icon,setIcon]= useState('')
    const [arrCategoryNews, setArrCategoryNews] = useState(arr)
    const [show, setShow] = useState(false)
    //------------------------------------------funtion
    // xử lý hiện labe của 

    useEffect(async()=>{
        try{
            const respon= await categoryApi.getProject()
            if(respon.isSuccess)
            {
                setArrCategoryProjects(respon.data)
                console.log('respon.data',respon.data)
            }
        }
        catch(e){

        }

    },[sta])

    useEffect(async()=>{
        try{
            const respon= await categoryApi.getNews()
            if(respon.isSuccess)
            {
                setArrCategoryNews(respon.data)
                console.log('respon.data',respon.data)
            }
        }
        catch(e){

        }

    },[sta])
    useEffect(async()=>{
        if (icon !== '') {
            
            let form = new FormData();
            form.append('Image', icon);
            form.append('TypeImage', "category");
            const response = await categoryApi.uploadFile(form);
            if (response.isSuccess) {
                setCategory({ ...category, icon:response.data})
            }
            else{
                Swal.fire('Tải ảnh lên thất bại')
            }
           
        }
    },[icon])
    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };
    const handleCreateCategory=(item)=>{
        Swal.fire({
            title: 'Bạn muốn tạo danh mục',
            text: "Cho 'Dự án' hay cho 'Tin tức'?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'var(--love-color-3)',
            cancelButtonColor: 'var(--love-color-4)',
            confirmButtonText: 'Dự án',
            cancelButtonText: 'Tin tức'
        }).then((result) => {
            if (result.isConfirmed) {
                powerCreate=1
                handleShow(item,'Tạo danh mục cho Dự án')

            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ){
                powerCreate=2
                handleShow(item,'Tạo danh mục cho Tin tức')

            }
        })
    }
    const handleShow = function(item,content){
        console.log(powerCreate)
        if(powerCreate===3)
        { 
            // console.log('sadsadsadsadas')
            // setUserDetail({...item,content:content})
        }
        else {
            setCategory({
                "categoryName": "",
                "icon": {
                    "fileName": "",
                    "filePath": "",
                    "friendlyUrl": "",
                    "note": ""
                },
                "type": 0
            })
        }
        setShow(true);
    }
    const handleChangAvatar =(e)=>{
        setIcon(e.target.files[0])
    }
    const handleClose = () => setShow(false);
    const handleCategory = async () => {
        if (category.categoryName !== '' &&category.icon.filePath !== '') {
            if (powerCreate == 3) {
                // const data = {
                //     "categoryName": "",
                //     "icon": {
                //         "fileName": "",
                //         "filePath": "",
                //         "friendlyUrl": "",
                //         "note": ""
                //     },
                //     "type": 0
                // }
                // const respon = await adminUser.updateUser(data)
                // if (respon.isSuccess) {
                //     handleClose()
                //     setSta(sta * (-1))
                //     Swal.fire('Cập nhật thông tin thành công')
                // }
                // else {
                //     Swal.fire('Cập nhật thông tin thất bại')
                // }
            }
            else{
                // tạo danh mục 
                const dataCategory = {
                    "categoryName": category.categoryName,
                    "icon": {
                        "fileName": category.icon.fileName,
                        "filePath": category.icon.filePath,
                        "friendlyUrl": category.icon.friendlyUrl,
                        "note": category.icon.note
                    },
                    "type": powerCreate
                }
                const responAdmin = await categoryApi.createCategory(dataCategory)
                if (responAdmin.isSuccess) {
                    handleClose()
                    setSta(sta * (-1))
                    powerCreate===1?Swal.fire('Tạo danh mục dứ án thành công'):Swal.fire('Tạo danh mục tin tức thành công')
                }
                else {
                    powerCreate===1?Swal.fire('Tạo danh mục dứ án thất bại'):Swal.fire('Tạo danh mục tin tức thất bại')
                }              
            }
        }
           
    }
    const handle1=()=>{

    }
    const handleDelete=(id)=>{  
        const DeleteApiFunc = async () => {
            const respon = await categoryApi.Delete(id)
            if (respon.isSuccess) {
                setSta(sta * (-1))
                handleClose()
                Swal.fire(
                    'Đã xóa!',
                    'Xóa danh mục thành công',
                    'success'
                )
            }
            else {
                Swal.fire(
                    'xóa thất bại!',
                    'Xóa danh mục thất bại',
                    'error'
                )
            }
            setSta(sta * (-1))

        }
        Swal.fire({
            title: 'Bạn có Chắc?',
            text: "Bạn muốn xóa danh mục này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteApiFunc()
            }
        }) 
    }
    return(
        <>
            <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý danh mục</h3>
                            <button onClick={()=>{handleCreateCategory(category)}} className={clsx(Style.btnCreateProject,"btn")}>
                            <span className="mdi mdi-plus-circle pe-2"></span> Tạo Danh Mục </button>
                        </div>
                    </div>
                </div>
                <div className={clsx('row px-5')}>
                  
                    <div className={clsx('list col-6')}>
                        <div className={clsx(Style.listPoject ,'shadow p-3 mb-5 bg-body rounded')}>
                            <h3 className="text-center text-primary py-3">Danh mục dự án</h3>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Tên danh mục</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrCategoryProjects.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th scope="row">{index+1}</th>
                                                            <td className={clsx(Style.titleshow)}>{item.id}</td>
                                                            <td   >{item.categoryName}
                                                            </td>
                                                          
                                                            <td  className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                    style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>Sửa danh mục</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item onClick={()=>{handleDelete(item.id)}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Xóa danh mục</Dropdown.Item>
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
                                </div >
                            </div>  
                        </div>
                    </div>
                    {/* danh muc new */}
                    <div className={clsx('list col-6')}>
                        <div className={clsx(Style.listPoject ,'shadow p-3 mb-5 bg-body rounded')}>
                        <h3 className="text-center text-primary py-3">Danh mục tin tức</h3>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Tên danh mục</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrCategoryNews.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th  scope="row">{index+1}</th>
                                                            <td className={clsx(Style.titleshow)}>{item.id}</td>
                                                            <td   >{item.categoryName.length>50?(item.categoryName.slice(0,50)+'...'):item.categoryName}
                                                            </td>
                                                          
                                                            <td  className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                    style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>Sửa danh mục</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item onClick={()=>{handleDelete(item.id)}}   className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Xóa danh mục</Dropdown.Item>
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
                                </div >
                            </div>  
                        </div>
                    </div>
                </div>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-black-50">
                            {powerCreate===1?'Tạo danh mục cho Dự án':(powerCreate===2?'Tạo danh mục cho Tin tức':'Sửa danh mục')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container-fluid ">
                        <div className="row p-3">
                            <div className={clsx(Style.imgAccountUpdate, "col-3 position-relative")}>

                                <img className={clsx(Style.img_item, "rounded-circle position-relative border border-1 img-fluid img-auto-size")}
                                    src={category.icon.filePath?process.env.REACT_APP_URL+category.icon.filePath:process.env.REACT_APP_URL + imgDefault} alt="" />
                                <input type="file" className={clsx(Style.changeimg, 'position-absolute')} onChange={(e) => { handleChangAvatar(e) }} style={{ cursor: "pointer", opacity: "0", cursor: "pointer" }} />
                            </div>

                            <Form className="col-9 py-2">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tên danh mục</Form.Label>
                                    <Form.Control className="border border-secondary"
                                        value={category.categoryName}
                                        onChange={(e) => {setCategory({...category,categoryName: e.target.value})}}
                                        type="text"
                                        placeholder="name"
                                        autoFocus
                                    />
                                </Form.Group>
                               

                            </Form>
                            

                        </div>

                    </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-between">
                        <div>

                            <Button  className={clsx("bg-danger",(powerCreate!==3)?'hide':"sleep")} variant="secondary" onClick={()=>{handleDelete()}}>

                                Xóa
                            </Button>
                        </div>
                        <div>
                            <Button className="me-2" variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={() => { handleCategory() }}>
                                {(powerCreate===1 || powerCreate===2)?'Tạo':'Cập nhật'}
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default AdminCategory