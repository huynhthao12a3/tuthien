import Style from "./Account.module.scss"
import clsx from "clsx"
import { margin, style } from "@mui/system"
import React, { Component, useEffect, useState } from 'react'
import DateRangePicker from 'rsuite/DateRangePicker';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import 'rsuite/dist/rsuite-rtl.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import * as $ from "jquery"
import Select from 'react-select'
import { Link } from "react-router-dom";
import categoryApi from "../../../api/Category";
import projectApi from "../../../api/Project";
import moment from "moment";
import { ar } from "date-fns/locale";
function AdminAccount()
{
    const arr=[
        {
        "id": 1,
        "name": "trần văn thuận",
        "email": 'tranthuan@gmail.com',
        "phoneNumber":'0987654321',
        "type": 1,
        'status':1,
        "img":'\\uploads\\Images\\project\\27042022_072721_Khai-Bai-Tiem nang.jpg'
        },
        {
        "id": 2,
        "name": "trần văn thuận",
        "email": 'tranthuan@gmail.com',
        "phoneNumber":'0987654321',
        "type": 1,
        'status':1,
        "img":'\\uploads\\Images\\project\\27042022_072721_Khai-Bai-Tiem nang.jpg'
        },
        {
        "id": 3,
        "name": "trần văn thuận",
        "email": 'tranthuan@gmail.com',
        "phoneNumber":'0987654321',
        "type": 1,
        'status':1,
        "img":'\\uploads\\Images\\project\\27042022_072721_Khai-Bai-Tiem nang.jpg'
        },
    ]
    const type = [
        { value: '1', label: 'cá nhân' },
        { value: '2', label: 'tổ chức' },
    ]
    // select trạng thái
    const filterStatus = [
        { value: '1', label: 'đang hoạt động' },
        { value: '2', label: 'khóa' },
    ]

    //-------------------------------useState

    const [arrayProject, setArrayProject] = useState(arr)
    const [inputSearch,setInputSearch]= useState('')
    const [inputType,setInputType]= useState(type[0])
    const [inputStatus,setInputStatus]= useState(filterStatus[0])

    console.log("arrayProject",arrayProject)
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
  

    const handleAcceptProject=(item)=>
    {
    }

    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };
    return(
        <>
            <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý bảng tin</h3>
                            <Link to='' className={clsx(Style.btnCreateProject,"btn")}>
                            <span class="mdi mdi-plus-circle pe-2"></span> Tạo bảng tin </Link>
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
                                                                    <img id="img-banner1" src={process.env.REACT_APP_URL + item.img } className={clsx(Style.img_item, "rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>
                                                            <td key={index+"name"} className={clsx(Style.lh)} >{item.name}</td>
                                                            <td key={index+'email'} className={clsx(Style.lh)} >{item.email}</td>
                                                          
                                                            <td key={index+'phonNumber'} className={clsx(Style.lh)} >{item.phoneNumber}</td>
                                                            <td key={index+'type'} className={clsx(Style.lh)} >{item.type}</td>
                                                            <td key={index+'status'} className={clsx(Style.lh)} >
                                                                <span className={clsx(Style.StatusItem, 'position-relative', item.status===1 ? 'waitingStatus': ( item.status=== 2 ? 'doingStatus' : 'doneStatus') )}>{ HandleGetLable(filterStatus,item.status).label}
                                                                    <div onClick={handleAcceptProject(item.id)} className={clsx(Style.changeStatus,'changeStatus')}>
                                                                        <span>duyệt bảng tin</span>
                                                                    </div>
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
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa bảng tin</Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item className={clsx(Style.itemDrop)}><span class="mdi mdi-plus-circle pe-2"></span>Thêm Tiến trình</Dropdown.Item>
                                                                        <Dropdown.Item className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Tiến trình</Dropdown.Item>
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