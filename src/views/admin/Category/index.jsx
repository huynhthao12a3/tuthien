import Style from "./Category.module.scss"
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
function AdminCategory(){
     //-------------------------------------------------------
    const arr=[
        {
        "id": 1,
        "title": "cứu trợ miền trung",
        "content": "đây là nội dung đây là nội dung đây là nội dung đây là nội dung đây là nội dung ",
        "createUser":'trần văn thuận',
        "status": 1,
        },
    ]
    const filtercategory = [
        { value: '1', label: 'Thiên tai' },
        { value: '2', label: 'Trẻ em' },
        { value: '3', label: 'Sức khỏe' },
        { value: '4', label: 'Con người' },
        { value: '5', label: 'Xã hội' },
    ]
    // select trạng thái
    const filterStatus = [
        { value: '1', label: 'chờ duyệt' },
        { value: '2', label: 'đã duyệt' },
    ]


    //-------------------------------useState
    const [categoryOptions,setCategoryOptions]= useState([])

    const [arrayProject, setArrayProject] = useState(arr)
    const [inputSearch,setInputSearch]= useState('')
    const [inputStatus,setInputStatus]= useState(filterStatus[1])
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
    console.log("sdasdsa",HandleGetLable(filtercategory,1))
  

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
                            <h3 className={clsx(Style.titleProject)}>Quản lý danh mục</h3>
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
                                                <th scope="col">Tiêu đề</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Người gửi</th>
                                                <th scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayProject.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th key={index+'index'} scope="row">{index}</th>
                                                            <td key={index+"title"} className={clsx(Style.titleshow)}>{item.title}</td>
                                                            <td key={index+'content'}  >{item.content.length>50?(item.content.slice(0,50)+'...'):item.content}
                                                            </td>
                                                          
                                                            <td key={index+'endate'}>{item.createUser}</td>
                                                            <td key={index+'status'}>
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
export default AdminCategory