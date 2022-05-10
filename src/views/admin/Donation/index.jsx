import Style from "./Donation.module.scss"
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
import Loading from "../../../shares/Loading"

import Swal from "sweetalert2";
import DanateApi from "../../../api/Donate";
function AdminDonation(){
    const imgFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const avatarDefalt = "\\uploads\\Images\\Hide_User\\06052022_080221_anymous_icon.png"
     //-------------------------------------------------------
    const arr=[
       
            {
                "userName": "Nguyễn Minh Hiếu",
                "userAvatar": "\\uploads\\Images\\client\\06052022_081259_phonepicutres-TA.jpg",
                "projectId": 2,
                "projectName": "MONG MỎI LẮP CHI GIẢ ĐỂ LAO ĐỘNG MƯU SINH CHĂM LO CHO GIA ĐÌNH",
                "amount": 500,
                "currency": "TRX",
                "hash": "79095d1ae2b8f13c4d47aea67dee0d5372e944a0b90c5c8f243c50fa5f2a9c3d",
                "type": 1
            },
       
    ]
    // select trạng thái
    const filterStatus = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'Đóng góp' },
        { value: '2', label: 'Hoàn tiền' },
        { value: '3', label: 'Rút tiền' },
    ]
     // datePicker
    
    //-------------------------------useState
    const [categoryOptions,setCategoryOptions]= useState([])

    const [arrayProject, setArrayProject] = useState(arr)
    const [inputStatus, setInputStatus] = useState(filterStatus[0])
    const [pageindex, setPageindex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    //-------------------------------------------useEffect
    useEffect(async()=>{
        try{
            const params={
                "currentindex":pageindex,
                "type":inputStatus.value,
            }
            const respons= await DanateApi.getall(params)
            if(respons.isSuccess)
            {
                setIsLoading(false)
                setArrayProject(respons.data)
                console.log("respon",respons.data)
            }
            else{
                Swal.fire('Load dữ liệu lên thất bại')
            }
        }
        catch(e){
            console.error(e)
        }
    },[inputStatus,pageindex])
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
         {

            isLoading ? <Loading /> : (
                <>
                   <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý lịch sử giao dịch</h3>
                           
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                          
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx(Style.Inputfocus)} placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>
                        <div className={clsx(Style.listPoject)}>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Hình ảnh</th>
                                                <th scope="col">Người gửi</th>
                                                <th scope="col">Tên dự án</th>
                                                {/* <th scope="col">thời gian</th> */}
                                                <th scope="col">Số tiền</th>
                                                <th className="text-center" scope="col">Loại tiền</th>
                                                <th className="text-center" scope="col">Hash</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayProject.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            
                                                            <th  scope="row">{index}</th>
                                                            <td>
                                                                <div className={clsx(Style.imgAccount, "col-4 col-md-2")}>
                                                                    <img id="img-banner1" src={(item.userAvatar)?(process.env.REACT_APP_URL + item.userAvatar):(process.env.REACT_APP_URL + avatarDefalt)} className={clsx(Style.img_item, "rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>
                                                            <td  >{item.userName}</td>
                                                            <td  >{item.projectName.length>15?item.projectName.slice(0,15)+'...':item.projectName}</td>
                                                            <td  >{item.amount}</td>
                                                            <td className="text-center">{item.currency}</td>
                                                            <td  className={clsx(Style.hash, "text-center")}>
                                                                <a href={"https://nile.tronscan.org/#/transaction/"+ item.hash}
                                                                    target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}> {item.hash.slice(0, 20) + '...'}</a>

                                                            </td>
                                                            {/* <td key={index+'status'}>
                                                                <span className={clsx(Style.StatusItem, 'position-relative', 'doneStatus' )}>
                                                                    {item.mountType}
                                                                </span> 
                                                            </td> */}
                                                          
                                                            <td key={index+'dropdow'} className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                    style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>Chi tiết</Dropdown.Item>
                                                                       
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
                    <div className="col-3 py-3"></div>
                    <di className="col-9 d-flex justify-content-start py-3">
                        <div>
                            <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                                <span className="mdi mdi-chevron-double-left"></span>
                            </button>
                            <span className="px-3 text-secondary">{pageindex}</span>
                            <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                                <span className="mdi mdi-chevron-double-right"></span>
                            </button>
                        </div>
                    </di>
                </div>
            </div>
                </>
            )
            }
         
        </>
    )
}
export default AdminDonation