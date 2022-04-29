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
import adminUser from "../../../api/User/Admin"
import Swal from 'sweetalert2'
function AdminAccount()
{
    const imgFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const avatarDefalt="\\uploads\\Images\\User_Avatars\\28042022_030444_anymous_icon.png"
    const arr=[
        {
        "id": 1,
        "fullName": "trần văn thuận",
        "email": 'tranthuan@gmail.com',
        "phoneNumber":'0987654321',
        "type": 1,
        'status':2,
        "avatar":'\\uploads\\Images\\project\\27042022_072721_Khai-Bai-Tiem nang.jpg'
        },
  
    ]
    const type = [
        { value: '1', label: 'tổ chức' },
        { value: '2', label: 'cá nhân' },
    ]
    // select trạng thái
    const filterStatus = [
        { value: '1', label: 'khóa' },
        { value: '2', label: 'đang hoạt động' },
    ]

    //-------------------------------useState

    const [arrayProject, setArrayProject] = useState(arr)
    const [inputSearch,setInputSearch]= useState('')
    const [inputType,setInputType]= useState([...type][1])
    const [inputStatus,setInputStatus]= useState(filterStatus[0])
    const [sta,setSta]=useState(true)

    //---------------------------------------------------------useEffect
    useEffect(async()=>{
        const data={
            "keyword":inputSearch,
            "type":inputType.value,
        }
        const respons= await adminUser.getAll(data)
        console.log("respon",respons.data)
        setArrayProject(respons.data)
    },[inputSearch,inputType,setSta])
    //------------------------------------------funtion
    // xử lý hiện labe của 
    function HandleGetLable(filterlist,index){
       
        return(
            filterlist.find(function(itemCategoty){
                if (itemCategoty.value===(index+'')){
                    return itemCategoty
                }
            })
        )
    }
    
    const getUsers=async()=>{
       
    }


    const handleblockAcount=(content,item)=>{
        const func = async() => {
            const respon= await adminUser.lock(item)   
                console.log("respon",respon)  
                if(respon.isSuccess)
                {
                    
                    Swal.fire(
                        'Đã khóa!',
                        `${content} tài khoản thành công` ,
                        'success'
                      )
                    setSta(!sta)
                }    
                else{
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            if (result.isConfirmed) {

                func()
             
            }
          })
    }
    const handleDelete=(id)=>{
        const DeleteApiFunc=async()=>{
            const respon= await adminUser.delete(id)   
            console.log("respon",respon)  
            if(respon.isSuccess)
            {
                setSta(!sta)
                Swal.fire(
                    'Đã xóa!',
                    'Xóa tài khoản thành công',
                    'success'
                  )
            }    
            else{
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            if (result.isConfirmed) {

                DeleteApiFunc()
            }
          })
    }
    // const Label = props => {
    //     return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    // };
    return(
        <>
            <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý tài khoản người dùng</h3>
                            <Link to='' className={clsx(Style.btnCreateProject,"btn")}>
                            <span class="mdi mdi-plus-circle pe-2"></span> Tạo tài khoản người dùng </Link>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent,'')}>Tìm kiếm</h5>
                                <div className="form-group">
                                    <input value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')}  placeholder="Tìm theo tên bảng tin" autoComplete="off" />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Loại</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputType} onChange={setInputType}  className={clsx( Style.Inputfocus)} placeholder='danh mục' options={type} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx( Style.Inputfocus)}  placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>
                        <div className={clsx(Style.listPoject)}>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Hình ảnh</th>
                                                <th scope="col">họ tên</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Điện thoại</th>
                                                <th scope="col">Loại</th>
                                                <th scope="col">trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayProject.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th key={index+'index'} scope="row">{index}</th>
                                                            <td key={index+'ing'}>
                                                                <div className={clsx(Style.imgAccount,"col-4 col-md-2")}>
                                                                    <img id="img-banner1" src={
                                                                        ( imgFormat.includes(item.avatar.slice(item.avatar.indexOf('.')+1)))?(process.env.REACT_APP_URL + item.avatar):(process.env.REACT_APP_URL + avatarDefalt)} className={clsx(Style.img_item, "rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>
                                                            <td key={index+"name"} className={clsx(Style.lh)} >{item.fullName}</td>
                                                            <td key={index+'email'} className={clsx(Style.lh)} >{item.email}</td>
                                                          
                                                            <td key={index+'phonNumber'} className={clsx(Style.lh)} >{item.phoneNumber}</td>
                                                            <td key={index+'type'} className={clsx(Style.lh)} >{ HandleGetLable(type,item.type).label}</td>
                                                            <td key={index+'status'} className={clsx(Style.lh)} >
                                                                <span className={clsx(Style.StatusItem, 'position-relative', item.status===1 ? 'waitingStatus': ( item.status=== 2 ? ' doingStatusUse' : 'doingStatusUse') )}>{ HandleGetLable(filterStatus,item.status).label}
                                                                  
                                                                </span> 
                                                            </td>
                                                          
                                                            <td key={index+'dropdow'} className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                    style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>Chi tiết</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa thông tin</Dropdown.Item>
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)} onClick={()=>{handleDelete(item.id)}}><i className="mdi mdi-lock-reset "></i>
                                                                            Xóa tài khoản
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={()=>handleblockAcount('mở khóa',item.id)} className={clsx(Style.itemDrop,item.status===1?"show":"hide")} ><i className={clsx("mdi mdi-lock-reset")}></i>
                                                                            Mở khóa tài khoản
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item  onClick={()=>handleblockAcount('khóa',item.id)} className={clsx(Style.itemDrop ,item.status===1?"hide":"show")} ><i  className="mdi mdi-lock-reset "></i>
                                                                            
                                                                            Khóa tài khoản
                                                                        </Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        {/* <Dropdown.Item className={clsx(Style.itemDrop)}><span class="mdi mdi-plus-circle pe-2"></span>Thêm Tiến trình</Dropdown.Item>
                                                                        <Dropdown.Item className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Tiến trình</Dropdown.Item> */}
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
            </div>
        </>
    )
}
export default AdminAccount