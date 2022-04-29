import Style from "./Artical.module.scss"
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
import moment from "moment";
import { ar } from "date-fns/locale";
function AdminArtical(){
     //-------------------------------------------------------
     const arr=[
        {
        "id": 1,
        "title": "cứu trợ miền trung",
        "idproject": 82,
        "createUser":'trần văn thuận',
        "upDate": '23/03/2022',
        },
        {
            "id": 1,
            "title": "cứu trợ miền trung",
            "idproject": 82,
            "createUser":'trần văn thuận',
            "upDate": '23/03/2022',
            },
            {
                "id": 1,
                "title": "cứu trợ miền trung",
                "idproject": 82,
                "createUser":'trần văn thuận',
                "upDate": '23/03/2022',
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
                            <h3 className={clsx(Style.titleProject)}>Quản lý bài viết</h3>
                            <Link to='' className={clsx(Style.btnCreateProject,"btn")}>
                            <span class="mdi mdi-plus-circle pe-2"></span> Tạo bài viết</Link>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx('list col-12')}>
                        <div className={clsx(Style.listPoject)}>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tiêu đề</th>
                                                <th scope="col">Mã dự án</th>
                                                <th scope="col">Người đăng</th>
                                                <th scope="col">Ngày đăng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayProject.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th key={index+'index'} scope="row">{index}</th>
                                                            <td key={index+"title"}>{item.title}</td>
                                                            <td key={index+'idProject'}>{item.idproject}</td>
                                                          
                                                            <td key={index+'createUser'}>{item.createUser}</td>
                                                            <td key={index+'update'}>{item.upDate}</td>
                                                          
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
export default AdminArtical