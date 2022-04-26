

import Style from "./Project.module.scss"
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

function Project(){

    //--------------------------------------------------------- useState 
    // selector
    const [categoryOptions,setCategoryOptions]= useState([])
    
    const filtercategory = [
        { value: '1', label: 'Thiên tai' },
        { value: '2', label: 'Trẻ em' },
        { value: '3', label: 'Sức khỏe' },
        { value: '4', label: 'Con người' },
        { value: '5', label: 'Xã hội' },
      ]
        // select trạng thái
      const filterStatus = [
        { value: '1', label: 'đang chờ duyệt' },
        { value: '2', label: 'đang thực thi' },
        { value: '3', label: 'hoàng thành' },
      ]
        // select chủ đề
      const filterTopic = [
        { value: '1', label: 'chủ đề 1' },
        { value: '2', label: 'chủ đề 2' },
      ]
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
    // daterangpicker ---------------------------------------
    const {
        allowedMaxDays,
        allowedDays,
        allowedRange,
        beforeToday,
        afterToday,
        combine
    } = DateRangePicker;
    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };
    const Ranges = [
        {
            label: 'Hôm nay',
            value: [startOfDay(new Date()), endOfDay(new Date())]
        },
        {
            label: 'Hôm qua',
            value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
        },
        {
            label: '7 ngày trước',
            value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
        },
        {
            label: '30 ngày trước',
            value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())]
        },
        {
            label: '1 năm trước',
            value: [startOfDay(subDays(new Date(), 364)), endOfDay(new Date())]
        },
    ];
    //--------------------------------------------------- useEffect
    useEffect(async()=>{
        const getAllUsers = async () => {
            try {
                const response = await categoryApi.getProject();
                setCategoryOptions(response.data.map((item)=>{
                    return({
                        value:item.id,
                        label:item.categoryName
                    })
                }))
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
    },[])

    // api fake
    const arr=[
        {
        "id": 1,
        "Name": "cứu trợ miền trung",
        "address": "miền trung",
        "category": 1,
        "dateCreate":'23/09/2021',
        "createUse": "trần văn thuận",
        "status": 1,
        },
        {
            "id": 2,
            "Name": "cứu trợ miền trung",
            "address": "miền trung",
            "category": 1,
            "dateCreate":'23/09/2021',
            "createUse": "trần văn thuận",
            "status": 2,
        },
        {
            "id": 3,
            "Name": "cứu trợ miền trung",
            "address": "miền trung",
            "category": 1,
            "dateCreate":'23/09/2021',
            "createUse": "trần văn thuận",
            "status": 3,
        },
        {
            "id": 4,
            "Name": "cứu trợ miền trung",
            "address": "miền trung",
            "category": 1,
            "dateCreate":'23/09/2021',
            "createUse": "trần văn thuận",
            "status": 1,
        },
    ]
    const [arrayProject, setArrayProject] = useState(arr)
    // chứa bộ lọc
    const [inputSearch,setInputSearch]= useState('')
    const [inputCategoty,setInputCategoty]= useState('')
    const [inputStatus,setInputStatus]= useState('')
    const [inputTopic,setInputTopic]= useState('')
    const [inputDate,setInputDate]=useState('')
    // get_project api............................
    useEffect(()=>{

        setInputDate($(".rs-picker-toggle-value")[0].innerHTML)

        // const getAllProject = async () => {
        //     try {
        //         const params = {
        //             keyword: inputSearch,
        //             categoryid: inputCategoty.value,
        //             statusid: inputStatus.value,
        //             topicId:inputTopic.value,
        //             date:inputDate,
        //         };
        //         const response = await Product.getAll(params);
        //         setArrayProject(response.data)
        //     }
        //     catch (e) {
        //         console.error(e)
        //     }
        // }
        // getAllProject()

        // console.log(inputSearch,'inputSearch')
        // console.log(inputCategoty.value,'inputCategoty')
        // console.log(inputStatus.value,'inputStatus')
        // console.log(inputTopic.value,'inputTopic')
        // console.log(inputDate,'inputDate')
    },[inputSearch ,inputCategoty , inputStatus ,inputTopic ,inputDate])
    // sự kiện thay đổi trạng thái 
    const handleAcceptProject=(item)=>
    {

    }

    return(
        <>
            <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý dự án</h3>
                            <Link to='' className={clsx(Style.btnCreateProject,"btn")}>
                            <span class="mdi mdi-plus-circle pe-2"></span> Tạo Dự Án </Link>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent,'')}>Tìm kiếm</h5>
                                <div className="form-group">
                                    <input value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')}  placeholder="Tìm theo tên dự án" autoComplete="off" />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Danh mục</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputCategoty} onChange={setInputCategoty}  className={clsx( Style.Inputfocus)} placeholder='danh mục' options={categoryOptions} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx( Style.Inputfocus)}  placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Chủ thể</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputTopic} onChange={setInputTopic} className={clsx( Style.Inputfocus)} placeholder='chủ đề' options={filterTopic} />
                                </div>
                            </div>
                             <div className="mt-4">
                                <h5 className={clsx(Style.searchContent,'')}>Ngày đăng</h5>
                                <div class="form-group" style={{ position: 'relative' }}>
                                <DateRangePicker className={clsx(Style.rangeDate,Style.Inputfocus,'projectDaterang')}
                                    disabledDate={afterToday()}
                                    // onChange={(value:[,]=>{this.setInputDate({date})}}
                                    // onOk={value=>{setDateValue(value)}}
                                    // onSelect={value => {console.log(value, 'yyyy/MM/dd')}}
                                    ari
                                    format='dd/MM/yyyy'
                                    defaultValue={[new Date(), new Date()]}
                                    character=' - '
                                    ranges={Ranges}
                                    // ref={textRef}
                                >
                                </DateRangePicker>
                              
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
                                                    <th scope="col">Mã dự án</th>
                                                    <th scope="col">Tên dự án</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col">Danh mục</th>
                                                    <th scope="col">Người tạo</th>
                                                    <th scope="col">Ngày tạo</th>
                                                    <th scope="col">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    arrayProject.map(function(item,index,arr){
                                                        return(
                                                            <tr style={{lineHeight:'2rem'}}>
                                                                <th scope="row">{index}</th>
                                                                <td>{item.id}</td>
                                                                <td>{item.Name}</td>
                                                                <td>{item.address}</td>
                                                                {/* filterStatus[item.category] */}
                                                                <td>{
                                                                    HandleGetLable(filtercategory,item.category).label
                                                                }</td>
                                                                <td>{item.createUse}</td>
                                                                <td>{item.dateCreate}</td>
                                                                {/* filterStatus[item.status] */}
                                                                <td>
                                                                    <span className={clsx(Style.StatusItem, 'position-relative', item.status===1 ? 'waitingStatus': ( item.status=== 2 ? 'doingStatus' : 'doneStatus') )}>{ HandleGetLable(filterStatus,item.status).label}
                                                                        <div onClick={handleAcceptProject(item.id)} className={clsx(Style.changeStatus,'changeStatus')}>
                                                                            <span>duyệt dự án</span>
                                                                        </div>
                                                                    </span> 
                                                                </td>
                                                                <td>
                                                                <td className=" text-center align-middle ">
                                                                    <Dropdown className="d-inline mx-2" >
                                                                        <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                        style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                 <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                            <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>Chi tiết</Dropdown.Item>
                                                                            {/* <Dropdown.Divider /> */}
                                                                            <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Dự Án</Dropdown.Item>
                                                                            {/* <Dropdown.Divider /> */}
                                                                            <Dropdown.Item className={clsx(Style.itemDrop)}><span class="mdi mdi-plus-circle pe-2"></span>Thêm Tiến trình</Dropdown.Item>
                                                                            <Dropdown.Item className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Tiến trình</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                                    
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

export default Project